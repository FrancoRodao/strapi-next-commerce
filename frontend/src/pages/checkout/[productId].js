import { dehydrate, QueryClient } from 'react-query'
import Checkout from '../../components/CheckoutPage/Checkout'
import { CheckoutPageContainer } from '../../components/CheckoutPage/CheckoutPage.style'
import ProductsInfo from '../../components/CheckoutPage/ProductsInfo'
import Loading from '../../components/Loading'
import { ProtectedRoute } from '../../routes/protectedRoute'
import { ProductsAPI } from '../../api/products'
import { useGetProduct } from '../../hooks/productHook'
import { QueryKeys } from '../../constants/queryKeys.constant'

export default function CheckoutProduct({ productId, selectedQuantity }) {
  const { data: product } = useGetProduct(productId)

  return (
    <CheckoutPageContainer>
      <Checkout />

      {product ? (
        <ProductsInfo productOrCart={{ ...product, selectedQuantity }} />
      ) : (
        <Loading />
      )}
    </CheckoutPageContainer>
  )
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  const { productId, quantity } = ctx.query
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery([QueryKeys.GET_PRODUCT, productId], () =>
    ProductsAPI.getProduct(productId)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId,
      selectedQuantity: Number(quantity) || 1
    }
  }
})
