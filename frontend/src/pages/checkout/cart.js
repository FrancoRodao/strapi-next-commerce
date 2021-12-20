import React from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { CartAPI } from '../../api/cart'
import Checkout from '../../components/CheckoutPage/Checkout'
import { CheckoutPageContainer } from '../../components/CheckoutPage/CheckoutPage.style'
import ProductsInfo from '../../components/CheckoutPage/ProductsInfo'
import Loading from '../../components/Loading'
import { userIsAuthenticated } from '../../helpers/userIsAuthenticated'
import { ProtectedRoute } from '../../routes/protectedRoute'

export default function CheckoutCart() {
  const { data: cart } = useQuery(`checkout-cart`, () => CartAPI.getCart())

  return (
    <CheckoutPageContainer>
      <Checkout />

      {cart ? <ProductsInfo productOrCart={cart} /> : <Loading />}
    </CheckoutPageContainer>
  )
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  const queryClient = new QueryClient()
  const { accessToken } = userIsAuthenticated(ctx)

  // all cart products
  await queryClient.prefetchQuery(`checkout-cart`, () =>
    CartAPI.getCart(accessToken)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
})
