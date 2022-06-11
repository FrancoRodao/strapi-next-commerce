module.exports = async (ctx, cartItems, newItemsProductsIds) => {
	/*validations*/

	if (!Array.isArray(cartItems)) ctx.throw(400, 'Error: body must be an array')

	if (
		!cartItems.every(
			(cartItem) =>
				Number.isInteger(cartItem.productId) && Number.isInteger(cartItem.quantity)
		)
	) {
		ctx.throw(400, 'Error: productId and quantity must be a number')
	}

	if (!cartItems.every((cartItem) => cartItem.productId && cartItem.quantity)) {
		ctx.throw(
			400,
			'Error: Array objects do not have productId or quantity property'
		)
	}

	const countExistsItemsCart = await strapi
		.query('producto')
		.count({ id: newItemsProductsIds })

	if (countExistsItemsCart !== newItemsProductsIds.length)
		ctx.throw(400, "Error: Some product doesn't exists")

	/*validations*/
}
