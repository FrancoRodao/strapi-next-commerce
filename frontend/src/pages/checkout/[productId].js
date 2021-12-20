import { dehydrate, QueryClient, useQuery } from 'react-query'
import { getProduct } from '../../api/products/getProducts'
import Checkout from '../../components/CheckoutPage/Checkout'
import { CheckoutPageContainer } from '../../components/CheckoutPage/CheckoutPage.style'
import ProductsInfo from '../../components/CheckoutPage/ProductsInfo'
import Loading from '../../components/Loading'
import { ProtectedRoute } from '../../routes/protectedRoute'

export default function CheckoutProduct({ productId, selectedQuantity }) {
  const { data: product } = useQuery(`checkout-product-${productId}`, () =>
    getProduct(productId)
  )

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

  // specific product
  await queryClient.prefetchQuery(`checkout-product-${productId}`, () =>
    getProduct(productId)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId,
      selectedQuantity: Number(quantity) || 1
    }
  }
})
