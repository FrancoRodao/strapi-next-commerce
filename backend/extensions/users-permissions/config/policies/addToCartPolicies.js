const Joi = require('joi')

module.exports = async (ctx, next) => {
  const cartItems = ctx.request.body

  const schema = Joi.array()
    .items(
      Joi.object({
        productId: Joi.number().required(),
        quantity: Joi.number().positive().integer().required()
      })
    )
    .validate(cartItems, {
      presence: 'required'
    })

  if (schema.error) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      msg: schema.error.message
    }
    return
  }

  //TODO: KEEP IT SIMPLE STUPID - ONE ONLY PRODUCT
  const newItems = cartItems.map((cartItem) => ({
    __component: 'custom.productos',
    producto: { id: cartItem.productId },
    cantidad: cartItem.quantity
  }))

  const newItemsProductsIds = newItems.map((item) => item.producto.id)

  const countExistsItemsCart = await strapi
    .query('producto')
    .count({ id: newItemsProductsIds })

  if (countExistsItemsCart !== newItemsProductsIds.length) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      msg: "Error: Some product doesn't exists"
    }
    return
  }

  await next()
}
