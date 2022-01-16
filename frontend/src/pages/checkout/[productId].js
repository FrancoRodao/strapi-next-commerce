import { dehydrate, QueryClient } from 'react-query'
import { useState } from 'react'
import Checkout from '../../components/CheckoutPage/Checkout'
import { CheckoutPageContainer } from '../../components/CheckoutPage/CheckoutPage.style'
import Loading from '../../components/Loading'
import { ProtectedRoute } from '../../routes/protectedRoute'
import { ProductsAPI } from '../../api/products'
import { useGetProduct } from '../../hooks/productHook'
import { QueryKeys } from '../../constants/queryKeys.constant'
import { ProductPayment } from '../../components/CheckoutPage/Payments/ProductPayment'
import { CheckoutProductInfo } from '../../components/CheckoutPage/CheckoutInfo'

export default function CheckoutProductPage({ productId, selectedQuantity }) {
  const { data: product, isError } = useGetProduct(productId)
  const [paymentStep, setPaymentStep] = useState(false)

  // TODO: IMPROVE IT
  if (isError) {
    return <div>Fatal error :(</div>
  }

  const goToPaymentStep = () => setPaymentStep(true)

  return (
    <CheckoutPageContainer>
      {paymentStep ? (
        <ProductPayment
          productId={productId}
          selectedQuantity={selectedQuantity}
        />
      ) : (
        <Checkout goToPaymentStep={goToPaymentStep} />
      )}

      {product ? (
        <CheckoutProductInfo
          product={product}
          selectedQuantity={selectedQuantity}
        />
      ) : (
        <Loading />
      )}
    </CheckoutPageContainer>
  )
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  // selected quantity and productId
  const { productId, quantity } = ctx.query
  const queryClient = new QueryClient()

  // prefetch product
  await queryClient.prefetchQuery([QueryKeys.GET_PRODUCT, productId], () =>
    ProductsAPI.getProduct(productId)
  )

  /* 
    The quantity that comes per URL (query params) cannot be greater
    than the quantity that actually exists on the backend. 
  */
  const quantityValidation = (product) =>
    quantity > product.cantidad ? product.cantidad : quantity

  // prefetched product
  const product = queryClient.getQueryData([QueryKeys.GET_PRODUCT, productId])

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId,
      selectedQuantity: Number(quantityValidation(product)) || 1
    }
  }
})
