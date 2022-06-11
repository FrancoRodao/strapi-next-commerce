import { useEffect, useState } from 'react'
import { filterCart } from '../helpers/filterCart'

export function useCheckoutValidCartItems(cart) {
	const [checkoutValidCartItems, setCheckoutValidCartItems] = useState([])

	useEffect(() => {
		async function validateCart() {
			const validatedCart = await filterCart(cart, {
				unpublishedProducts: true,
				productsOutOfStock: true,
				checkAndUpdateCartItemsStock: false
			})

			setCheckoutValidCartItems(validatedCart)
		}

		validateCart()
	}, [cart])

	return {
		checkoutValidCartItems
	}
}
