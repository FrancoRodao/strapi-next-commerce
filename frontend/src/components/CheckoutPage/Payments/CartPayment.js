import { useQueryClient } from 'react-query'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { QueryKeys } from '../../../constants/queryKeys.constant'
import { createPaypalOrderObject } from '../../../helpers/createPaypalOrderObject'
import { getTotalPriceCart } from '../../../helpers/getTotalPriceCart'
import { useCreatePaypalStrapiOrder } from '../../../hooks/ordersHook'
import { PaypalPaymentOption } from './options/PaypalPaymentOption'
import { useClearCart, useGetUserCart } from '../../../hooks/cartHook'

export function CartPayment() {
  const { data: cart, refetch: refetchCart } = useGetUserCart({
    checkoutCartValidations: true
  })
  const { clearCart } = useClearCart()

  const router = useRouter()
  const queryClient = useQueryClient()

  const { createPaypalStrapiOrder } = useCreatePaypalStrapiOrder()

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
      /*      
      updatedCart bring the products populated, 
      with this we can know if there is enough stock to cover the car

      example: if there are 8 units of a product in a user's cart 
      and the stock of the same product is 8 units but another user 
      buys 1 unit of that product, the stock is 7 units, 
      but the user still has 8 units in their cart , 
      then this validates that there is enough stock of the products 
      that the user has in their cart
    */

      // refresh data
      queryClient.invalidateQueries(QueryKeys.GET_USER_CART, {
        exact: true
      })
      const updatedCartQuery = await refetchCart({
        throwOnError: true
      })

      const areCartsEquals =
        updatedCartQuery.data.length === cart.length &&
        updatedCartQuery.data.every(
          (element, index) =>
            JSON.stringify(element) === JSON.stringify(cart[index])
        )

      if (!areCartsEquals) {
        toast.error('No hay suficiente stock disponible, inténtelo nuevamente.')
        router.push('/cart')
        return
      }

      actions.order.capture().then((orderData) => {
        const orderId = orderData.id

        clearCart()

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
