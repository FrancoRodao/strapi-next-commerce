'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async createOrder(ctx) {
    try {
      const userId = ctx.state.user.id
      const { products, delivered, paymentInfo } = ctx.request.body

      /*extract products from body*/
      const orderedProducts = products.map((product) => ({
        __component: 'custom.productos',
        producto: { id: product.productId },
        cantidad: product.quantity
      }))

      /* UPDATE STOCK  */
      const productsQuery = await strapi.query('producto')

      const productsUpdatesPromises = []
      let orderTotalPrice = 0

      for (const item of orderedProducts) {
        const dbProduct = await productsQuery.findOne({ id: item.producto.id })
        orderTotalPrice +=
          (dbProduct.precio_oferta || dbProduct.precio) * item.cantidad

        if (item.cantidad > dbProduct.cantidad) {
          ctx.response.status = 400
          ctx.body = {
            statusCode: 400,
            msg: `We don't have enough stock of ${dbProduct.titulo}`
          }
          return
        }

        productsUpdatesPromises.push(
          productsQuery.update(
            {
              id: item.producto.id
            },
            {
              vendidos: dbProduct.vendidos + item.cantidad,
              cantidad: dbProduct.cantidad - item.cantidad
            }
          )
        )
      }

      await Promise.all(productsUpdatesPromises)

      /* UPDATE STOCK  */

      /*  CREATE ORDER  */
      const orderQuery = await strapi.query('pedidos')

      const order = await orderQuery.create({
        pedidos: orderedProducts,
        total: orderTotalPrice,
        user: userId,
        entregado: delivered || false,
        info_de_pago: {
          __component: 'pagos.info_de_pago',
          metodo_de_pago: paymentInfo.method,
          correo_de_pago: paymentInfo.email,
          nombre_de_pago: paymentInfo.name,
          apellido_de_pago: paymentInfo.surname
        }
      })
      /*  CREATE ORDER  */

      ctx.response.status = 201
      ctx.body = {
        statusCode: 201,
        order
      }
    } catch (error) {
      ctx.response.status = 500
      ctx.body = {
        statusCode: 500,
        msg: 'Unexpected error'
      }
    }
  }
}
