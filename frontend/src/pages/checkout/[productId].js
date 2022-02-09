import { dehydrate, QueryClient } from 'react-query'
import Checkout from '../../components/CheckoutPage/Checkout'
import { CheckoutPageContainer } from '../../components/CheckoutPage/CheckoutPage.style'
import { ProtectedRoute } from '../../routes/protectedRoute'
import { ProductsAPI } from '../../api/products'
import { useGetProduct } from '../../hooks/productHook'
import { QueryKeys } from '../../constants/queryKeys.constant'
import { ProductPayment } from '../../components/CheckoutPage/Payments/ProductPayment'
import { CheckoutProductInfo } from '../../components/CheckoutPage/CheckoutInfo'
import {
  CheckoutContextProvider,
  useCheckoutContext
} from '../../context/Checkout/CheckoutContext'
import { CheckoutLoading } from '../../components/CheckoutPage/CheckoutLoading'
import { CheckoutContentContainer } from '../../components/CheckoutPage/CheckoutContentContainer'

function Page({ productId, selectedQuantity }) {
  const {
    state: { paymentStep, loading: checkoutLoading }
  } = useCheckoutContext()

  const { data: product, isLoading: productLoading } = useGetProduct(productId)

  const loading = productLoading || checkoutLoading.state

  return (
    <>
      <CheckoutLoading message={checkoutLoading.message} isLoading={loading} />

      <CheckoutContentContainer isLoading={loading}>
        <>
          {paymentStep ? (
            <ProductPayment
              productId={productId}
              selectedQuantity={selectedQuantity}
            />
          ) : (
            <Checkout />
          )}

          {product && (
            <CheckoutProductInfo
              product={product}
              selectedQuantity={selectedQuantity}
            />
          )}
        </>
      </CheckoutContentContainer>
    </>
  )
}

export default function CheckoutProductPage({ productId, selectedQuantity }) {
  const { isError } = useGetProduct(productId)

  // TODO: IMPROVE IT
  if (isError) {
    return <div>Fatal error :(</div>
  }

  return (
    <CheckoutContextProvider>
      <CheckoutPageContainer>
        <Page productId={productId} selectedQuantity={selectedQuantity} />
      </CheckoutPageContainer>
    </CheckoutContextProvider>
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

  if (!product) {
    return {
      props: {
        dehydratedState: dehydrate(queryClient)
      }
    }
  }

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId,
      selectedQuantity: Number(quantityValidation(product)) || 1
    }
  }
})
