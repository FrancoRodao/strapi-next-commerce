export const getTotalPriceCart = (cart = []) => {
	let total = 0

	cart.forEach((cartItem) => {
		total +=
			(cartItem.producto.precio_oferta || cartItem.producto.precio) *
			cartItem.cantidad
	})

	return total
}
