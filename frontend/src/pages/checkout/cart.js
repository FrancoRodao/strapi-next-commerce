import { useState } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { CartAPI } from '../../api/cart'
import Checkout from '../../components/CheckoutPage/Checkout'
import { CheckoutPageContainer } from '../../components/CheckoutPage/CheckoutPage.style'
import { CartPayment } from '../../components/CheckoutPage/Payments/CartPayment'
import ProductsInfo from '../../components/CheckoutPage/ProductsInfo'
import Loading from '../../components/Loading'
import { QueryKeys } from '../../constants/queryKeys.constant'
import { userIsAuthenticated } from '../../helpers/userIsAuthenticated'
import { useGetUserCart } from '../../hooks/cartHook'
import { ProtectedRoute } from '../../routes/protectedRoute'

export default function CheckoutCartPage() {
  const { data: cart } = useGetUserCart()
  const [paymentStep, setPaymentStep] = useState(false)

  const goToPaymentStep = () => setPaymentStep(true)

  return (
    <CheckoutPageContainer>
      {paymentStep ? (
        <CartPayment />
      ) : (
        <Checkout goToPaymentStep={goToPaymentStep} />
      )}

      {cart ? <ProductsInfo productOrCart={cart} /> : <Loading />}
    </CheckoutPageContainer>
  )
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  const queryClient = new QueryClient()
  const { accessToken } = userIsAuthenticated(ctx)

  // all cart products
  await queryClient.prefetchQuery(QueryKeys.GET_USER_CART, () =>
    CartAPI.getCart(accessToken)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
})
