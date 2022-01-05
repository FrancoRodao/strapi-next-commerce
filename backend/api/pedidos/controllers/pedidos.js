'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async createOrder(ctx) {
    const userId = ctx.state.user.id
    const { products, total, delivered, paymentInfo } = ctx.request.body

    /*extract products from body*/
    let newProducts = products.map((product) => ({
      __component: 'custom.productos',
      producto: { id: product.productId },
      cantidad: product.quantity
    }))

    /* UPDATE STOCK  */
    const productsQuery = await strapi.query('producto')

    for (let index = 0; index < newProducts.length; index++) {
      const item = newProducts[index]
      const dbProduct = await productsQuery.findOne({ id: item.producto.id })

      if (item.cantidad > dbProduct.cantidad) {
        ctx.response.status = 400
        ctx.body = {
          statusCode: 400,
          msg: "We don't have enough stock"
        }
        return
      }

      await productsQuery.update(
        {
          id: item.producto.id
        },
        {
          vendidos: dbProduct.vendidos + item.cantidad,
          cantidad: dbProduct.cantidad - item.cantidad
        }
      )
    }
    /* UPDATE STOCK  */

    /*  CREATE ORDER  */
    const pedidosQuery = await strapi.query('pedidos')

    const order = await pedidosQuery.create({
      pedidos: newProducts,
      total,
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
  }
}
