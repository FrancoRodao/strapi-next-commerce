import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js'
import Loading from '../../../Loading'
import { PaymentOption, PaymentTitle } from '../Payment.style'

export function PaypalPaymentOption({ createOrder, onApprove }) {
  const [{ isPending }] = usePayPalScriptReducer()

  return (
    <>
      <PaymentTitle>¿Cómo quieres pagar?</PaymentTitle>
      <PaymentOption>Con PayPal</PaymentOption>
      {isPending && <Loading />}
      <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
    </>
  )
}
