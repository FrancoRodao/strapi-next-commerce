import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { QueryKeys } from '../../../constants/queryKeys.constant'
import { createPaypalOrderObject } from '../../../helpers/createPaypalOrderObject'
import { getTotalPriceCart } from '../../../helpers/getTotalPriceCart'
import { useCreatePaypalStrapiOrder } from '../../../hooks/ordersHook'
import { PaypalPaymentOption } from './options/PaypalPaymentOption'
import {
	getUserCartQuery,
	useClearCart,
	useGetUserCart
} from '../../../hooks/cartHook'
import { useCheckoutContext } from '../../../context/Checkout/CheckoutContext'
import { types } from '../../../context/Checkout/types'

export function CartPayment() {
	const { data: cart } = useGetUserCart({
		checkoutCartValidations: true
	})
	const { clearCart } = useClearCart()
	const { dispatch } = useCheckoutContext()

	const router = useRouter()
	const queryClient = useQueryClient()

	const { createPaypalStrapiOrder } = useCreatePaypalStrapiOrder({
		onSuccess: async (response) => {
			await router.push(`/profile/orders/${response.strapiOrderId}`)
			dispatch({
				type: types.loading,
				loading: {
					state: false,
					message: null
				}
			})
			clearCart()
		}
	})

	const handleCreateOrder = async (_, actions) => {
		// mapped to be processed by createPayPalOrderObject
		const cartMapped = cart.map((item) => ({
			product: item.producto,
			quantity: item.cantidad
		}))

		const paypalOrder = actions.order.create(
			createPaypalOrderObject(cartMapped, getTotalPriceCart(cart))
		)

		return paypalOrder
	}

	const handleOnApprove = async (_, actions) => {
		try {
			dispatch({
				type: types.loading,
				loading: {
					state: true,
					message: 'Procesando pago...'
				}
			})

			/*      
      updatedCart bring the products populated, 
      with this we can know if there is enough stock to cover the cart

      example: if there are 8 units of a product in a user's cart 
      and the stock of the same product is 8 units but another user 
      buys 1 unit of that product, the stock is 7 units, 
      but the user still has 8 units in their cart , 
      then this validates that there is enough stock of the products 
      that the user has in their cart
    */

			// refresh data
			await queryClient.invalidateQueries(QueryKeys.GET_USER_CART, {
				exact: true
			})
			const updatedCart = await queryClient.fetchQuery(
				QueryKeys.GET_USER_CART,
				() =>
					getUserCartQuery({
						checkoutCartValidations: true
					})
			)

			const areCartsEquals =
				updatedCart.length === cart.length &&
				updatedCart.every(
					(element, index) => JSON.stringify(element) === JSON.stringify(cart[index])
				)

			if (!areCartsEquals) {
				toast.error('No hay suficiente stock disponible, inténtelo nuevamente.')
				router.push('/cart')
				return
			}

			actions.order.capture().then((orderData) => {
				const orderId = orderData.id

				createPaypalStrapiOrder({
					orderId
				})
			})
		} catch (error) {
			toast.error('Ocurrió un error inesperado')
			router.push('/')
		}
	}

	return (
		<PaypalPaymentOption
			createOrder={handleCreateOrder}
			onApprove={handleOnApprove}
		/>
	)
}
