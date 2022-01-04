import { useGetProduct } from '../../../hooks/productHook'
import Loading from '../../Loading'
import { PaypalPaymentOption } from './options/PaypalPaymentOption'
import { PaymentContainer } from './Payment.style'

export function ProductPayment({ productId, selectedQuantity }) {
  const { data: product, isLoading, isError } = useGetProduct(productId)

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

  const handleOnApprove = (data, actions) =>
    actions.order.capture().then(() => {
      // Your code here after capture the order
      console.log('GOOD', data)
    })

  return (
    <PaymentContainer>
      <PaypalPaymentOption
        createOrder={handleCreateOrder}
        onApprove={handleOnApprove}
      />
    </PaymentContainer>
  )
}
