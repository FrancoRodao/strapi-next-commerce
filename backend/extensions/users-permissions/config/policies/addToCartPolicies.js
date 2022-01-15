module.exports = async (ctx, next) => {
  //TODO: KEEP IT SIMPLE STUPID - ONE ONLY PRODUCT
  const cartItems = ctx.request.body

  if (!Array.isArray(cartItems)) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      error: 'Bad request',
      message: 'Error: body must be an array'
    }
    return
  }

  if (
    !cartItems.every(
      (cartItem) =>
        Number.isInteger(cartItem.productId) &&
        Number.isInteger(cartItem.quantity) &&
        cartItem.quantity > 0
    )
  ) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      error: 'Bad request',
      message:
        'Error: productId must be a int number and quantity must be a positive int number'
    }
    return
  }

  if (
    !cartItems.every(
      (cartItem) => cartItem.hasOwnProperty('productId') && cartItem.quantity
    )
  ) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      error: 'Bad request',
      message: 'Error: Array objects do not have productId or quantity property'
    }
    return
  }

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
      error: 'Bad request',
      message: "Error: Some product doesn't exists"
    }
    return
  }

  await next()
}
