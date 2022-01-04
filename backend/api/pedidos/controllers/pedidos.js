'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

module.exports = {
  async createOrder(ctx) {
    //TODO: MIDDLEWARE VLIDATIONS
    const userId = ctx.state.user.id
    const { products, total, delivered, paymentInfo } = ctx.request.body
    const query = await strapi.query('pedidos')

    /*extract products from body*/
    let newProducts = products.map((product) => ({
      __component: 'custom.productos',
      producto: { id: product.productId },
      cantidad: product.quantity
    }))

    const order = await query.create({
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

    ctx.response.status = 201
    ctx.body = {
      statusCode: 201,
      order
    }
  }
}
