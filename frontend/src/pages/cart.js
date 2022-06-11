import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
import Link from 'next/link'
import { CartCard } from '../components/Cards/CartCard.js/CartCard'
import Loading from '../components/Loading'
import { userIsAuthenticated } from '../helpers/userIsAuthenticated'
import { ProtectedRoute } from '../routes/protectedRoute'
import { getTotalPriceCart } from '../helpers/getTotalPriceCart'
import { getUserCartQuery, useGetUserCart } from '../hooks/cartHook'
import { QueryKeys } from '../constants/queryKeys.constant'
import { Button } from '../components/Button'
import { useCheckoutValidCartItems } from '../hooks/useCheckoutValidCartItems'

const MainContainer = styled.div`
	background-color: #fff;
	padding: 30px;
	max-width: 1200px;
	margin: auto;

	.nav {
		display: flex;

		ul {
			border-bottom: 2px solid black;
			padding: 20px 50px;
		}

		&__title {
			font-weight: 500;
			color: #333;
		}
	}

	.total {
		width: 100%;
		padding: 30px 0px;
		font-size: 30px;
		font-weight: 500;
		text-align: right;
	}

	.buy-btn {
		display: block;
		width: fit-content;
		margin-left: auto;
		font-weight: 500;
	}

	@media (max-width: 425px) {
		padding: 30px 0;

		.total {
			padding-right: 5px;
		}

		.buy-btn {
			margin-right: 5px;
		}
	}

	.no-items-container {
		display: flex;
		justify-content: center;
		padding: 50px 0px;
		font-size: 25px;
		color: ${({ theme }) => theme.gray};
	}
`

function RenderCart({ cart }) {
	const { checkoutValidCartItems } = useCheckoutValidCartItems(cart)

	return (
		<>
			{cart.length > 0 ? (
				<>
					{cart.map(({ id, cantidad, producto }) => (
						<CartCard
							key={id}
							cartItemId={id}
							productId={producto.id}
							title={producto.titulo}
							price={producto.precio}
							offerPrice={producto.precio_oferta}
							image={producto.imagenes[0]}
							cartItemQuantity={cantidad}
							productQuantity={producto.cantidad}
							productPublishedAt={producto.published_at}
						/>
					))}

					<p className='total'>
						Total: USD {getTotalPriceCart(checkoutValidCartItems)}
					</p>
					<div className='buy-btn'>
						<Link href='checkout/cart'>
							<a href='checkout/cart'>
								<Button>Continuar compra</Button>
							</a>
						</Link>
					</div>
				</>
			) : (
				<div className='no-items-container'>
					<p>Tu carrito está vacío</p>
				</div>
			)}
		</>
	)
}

export default function Cart() {
	const { data: cart, isLoading, isError } = useGetUserCart()

	// TODO: IMPROVE IT
	if (isError) {
		return <h1>Fatal error :(</h1>
	}

	return (
		<MainContainer>
			<nav className='nav'>
				<ul>
					<li>
						<h3 className='nav__title'>Carrito ({cart && cart.length})</h3>
					</li>
				</ul>
			</nav>

			{isLoading || !cart ? <Loading /> : <RenderCart cart={cart} />}
		</MainContainer>
	)
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
	const queryClient = new QueryClient()
	const { accessToken } = userIsAuthenticated(ctx)

	await queryClient.prefetchQuery(QueryKeys.GET_USER_CART, () =>
		getUserCartQuery({
			accessToken
		})
	)

	return {
		props: {
			dehydratedState: dehydrate(queryClient)
		}
	}
})
