import { getTotalPriceCart } from '../../../helpers/getTotalPriceCart'
import { useGetUserCart } from '../../../hooks/cartHook'
import { useCreateOrder } from '../../../hooks/ordersHook'
import Loading from '../../Loading'
import { PaypalPaymentOption } from './options/PaypalPaymentOption'

const cartToPaypalItems = (cart) => {
  if (!Array.isArray(cart)) {
    return new Error('CART MUST BE AN ARRAY')
  }

  return cart.map((cartItem) => ({
    name: cartItem.producto.titulo,
    unit_amount: {
      value: cartItem.producto.precio_oferta || cartItem.producto.precio,
      currency_code: 'USD'
    },
    quantity: cartItem.cantidad
  }))
}

export function CartPayment() {
  const { data: cart, isLoading, isError } = useGetUserCart()
  const { createOrder } = useCreateOrder()

  // TODO: IMPROVE THE LOADING / ERROR SCREEN
  if (isLoading || isError) {
    return <Loading />
  }

  const handleCreateOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: getTotalPriceCart(cart),
            breakdown: {
              item_total: {
                value: getTotalPriceCart(cart),
                currency_code: 'USD'
              }
            }
          },
          items: cartToPaypalItems(cart),
          shipping: {
            name: {
              full_name: 'MOBILE KING'
            },
            address: {
              address_line_1: 'RETIRO EN LOCAL',
              admin_area_2: 'CALLE RANDOM ESQUINA RANDOM',
              country_code: 'UY',
              postal_code: '3000'
            }
          }
        }
      ],
      application_context: {
        shipping_preference: 'SET_PROVIDED_ADDRESS'
      }
    })

  const handleOnApprove = (_, actions) =>
    actions.order.capture().then((data) => {
      const products = cart.map((cartItem) => ({
        productId: cartItem.producto.id,
        quantity: cartItem.cantidad
      }))

      createOrder({
        products,
        delivered: false,
        paymentInfo: {
          method: 'Paypal',
          email: data.payer.email_address,
          name: data.payer.name.given_name,
          surname: data.payer.name.surname
        }
      })
    })

  return (
    <PaypalPaymentOption
      createOrder={handleCreateOrder}
      onApprove={handleOnApprove}
    />
  )
}
