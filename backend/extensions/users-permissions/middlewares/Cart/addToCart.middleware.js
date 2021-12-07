module.exports = async (ctx, cartItems, newItemsProductsIds) => {
  /*validations*/

  if (!Array.isArray(cartItems)) {
    ctx.response.status = 400
    return {
      statusCode: 400,
      error: 'Bad request',
      message: 'Error: body must be an array'
    }
  }

  if (
    !cartItems.every(
      (cartItem) =>
        Number.isInteger(cartItem.productId) &&
        Number.isInteger(cartItem.quantity)
    )
  ) {
    ctx.response.status = 400
    return {
      statusCode: 400,
      error: 'Bad request',
      message: 'Error: productId and quantity must be a number'
    }
  }

  if (!cartItems.every((cartItem) => cartItem.productId && cartItem.quantity)) {
    ctx.response.status = 400
    return {
      statusCode: 400,
      error: 'Bad request',
      message: 'Error: Array objects do not have productId or quantity property'
    }
  }

  const countExistsItemsCart = await strapi
    .query('producto')
    .count({ id: newItemsProductsIds })

  if (countExistsItemsCart !== newItemsProductsIds.length) {
    ctx.response.status = 400
    return {
      statusCode: 400,
      error: 'Bad request',
      message: "Error: Some product doesn't exists"
    }
  }

  /*validations*/
}
