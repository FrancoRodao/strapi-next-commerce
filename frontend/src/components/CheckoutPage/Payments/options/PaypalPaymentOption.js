import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer
} from '@paypal/react-paypal-js'
import Loading from '../../../Loading'
import { PaymentContainer, PaymentOption, PaymentTitle } from '../Payment.style'

export function PaypalPaymentOption({ createOrder, onApprove }) {
  return (
    <PayPalScriptProvider
      options={{
        'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
        locale: 'es_UY',
        components: 'buttons'
      }}
    >
      <PaymentContainer>
        <PaymentTitle>¿Cómo quieres pagar?</PaymentTitle>
        <PaymentOption>Con PayPal</PaymentOption>

        <PayPalButtonsWrapper createOrder={createOrder} onApprove={onApprove} />
      </PaymentContainer>
    </PayPalScriptProvider>
  )
}

const PayPalButtonsWrapper = ({ createOrder, onApprove }) => {
  const [{ isPending }] = usePayPalScriptReducer()

  return (
    /*  LOADING Height WHILE LOADING PAPYAL SDK */
    <div style={{ minHeight: '200px' }}>
      {isPending && <Loading />}

      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </div>
  )
}
