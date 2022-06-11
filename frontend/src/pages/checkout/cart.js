import { useEffect } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import Checkout from '../../components/CheckoutPage/Checkout'
import { CheckoutPageContainer } from '../../components/CheckoutPage/CheckoutPage.style'
import { CartPayment } from '../../components/CheckoutPage/Payments/CartPayment'
import { QueryKeys } from '../../constants/queryKeys.constant'
import { userIsAuthenticated } from '../../helpers/userIsAuthenticated'
import { ProtectedRoute } from '../../routes/protectedRoute'
import { getUserCartQuery, useGetUserCart } from '../../hooks/cartHook'
import { CheckoutCartInfo } from '../../components/CheckoutPage/CheckoutInfo'
import {
	CheckoutContextProvider,
	useCheckoutContext
} from '../../context/Checkout/CheckoutContext'
import { CheckoutLoading } from '../../components/CheckoutPage/CheckoutLoading'
import { CheckoutContentContainer } from '../../components/CheckoutPage/CheckoutContentContainer'

function Page() {
	const {
		state: { paymentStep, loading: checkoutLoading }
	} = useCheckoutContext()

	const { data: cart, isLoading: userCartLoading } = useGetUserCart()

	const loading = userCartLoading || checkoutLoading.state

	return (
		<>
			<CheckoutLoading isLoading={loading} message={checkoutLoading.message} />

			<CheckoutContentContainer isLoading={loading}>
				<>
					{paymentStep ? <CartPayment /> : <Checkout />}
					{cart && <CheckoutCartInfo cart={cart} />}
				</>
			</CheckoutContentContainer>
		</>
	)
}

export default function CheckoutCartPage() {
	const { data: cart, isError } = useGetUserCart()
	const router = useRouter()

	// THE CART MUST HAVE AT LEAST ONE PRODUCT
	useEffect(() => {
		if (!isError && cart?.length <= 0) {
			toast.error('No tienes ningún producto en el carrito para comprar')
			router.push('/cart')
		}
	}, [cart])

	// TODO: IMPROVE IT
	if (isError) {
		return <h1>Fatal error :(</h1>
	}

	return (
		<CheckoutContextProvider>
			<CheckoutPageContainer>
				<Page />
			</CheckoutPageContainer>
		</CheckoutContextProvider>
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
