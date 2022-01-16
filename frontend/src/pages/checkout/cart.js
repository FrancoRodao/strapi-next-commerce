import { useEffect, useState } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Checkout from '../../components/CheckoutPage/Checkout'
import { CheckoutPageContainer } from '../../components/CheckoutPage/CheckoutPage.style'
import { CartPayment } from '../../components/CheckoutPage/Payments/CartPayment'
import Loading from '../../components/Loading'
import { QueryKeys } from '../../constants/queryKeys.constant'
import { userIsAuthenticated } from '../../helpers/userIsAuthenticated'
import { ProtectedRoute } from '../../routes/protectedRoute'
import { getUserCartQuery, useGetUserCart } from '../../hooks/cartHook'
import { CheckoutCartInfo } from '../../components/CheckoutPage/CheckoutInfo'

export default function CheckoutCartPage() {
  const [paymentStep, setPaymentStep] = useState(false)

  const { data: cart, isError } = useGetUserCart()

  const router = useRouter()

  // TODO: IMPROVE IT
  if (isError) {
    return <h1>Fatal error :(</h1>
  }

  // THE CART MUST HAVE AT LEAST ONE PRODUCT
  useEffect(() => {
    if (!isError && cart?.length <= 0) {
      toast.error('No tienes ningún producto en el carrito para comprar')
      router.push('/cart')
    }
  }, [cart])

  const goToPaymentStep = () => setPaymentStep(true)

  return (
    <CheckoutPageContainer>
      {paymentStep ? (
        <CartPayment />
      ) : (
        <Checkout goToPaymentStep={goToPaymentStep} />
      )}
      {cart ? <CheckoutCartInfo cart={cart} /> : <Loading />}
    </CheckoutPageContainer>
  )
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  const queryClient = new QueryClient()
  const { accessToken } = userIsAuthenticated(ctx)

  // prefetch all cart products
  await queryClient.prefetchQuery(QueryKeys.GET_USER_CART, async () =>
    getUserCartQuery({
      checkoutCartValidations: true,
      accessToken
    })
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
})
