import { useCreateOrder } from '../../../hooks/ordersHook'
import { useGetProduct } from '../../../hooks/productHook'
import Loading from '../../Loading'
import { PaypalPaymentOption } from './options/PaypalPaymentOption'

export function ProductPayment({ productId, selectedQuantity }) {
  const { data: product, isLoading, isError } = useGetProduct(productId)
  const { createOrder } = useCreateOrder()

  // TODO: IMPROVE THE LOADING / ERROR SCREEN
  if (isLoading || isError) {
    return <Loading />
  }

  const totalPrice =
    (product.precio_oferta || product.precio) * selectedQuantity

  const handleCreateOrder = (data, actions) =>
    actions.order.create({
      purchase_units: [
        {
          amount: {
            currency_code: 'USD',
            value: totalPrice,
            breakdown: {
              item_total: {
                value: totalPrice,
                currency_code: 'USD'
              }
            }
          },
          items: [
            {
              name: product.titulo,
              unit_amount: {
                value: product.precio_oferta || product.precio,
                currency_code: 'USD'
              },
              quantity: selectedQuantity || 1
            }
          ],
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
      createOrder({
        products: [{ productId: product.id, quantity: selectedQuantity }],
        total: totalPrice,
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
