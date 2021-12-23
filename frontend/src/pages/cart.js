import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import Link from 'next/link'
import { CartAPI } from '../api/cart'
import { CartCard } from '../components/Cards/CartCard.js/CartCard'
import Loading from '../components/Loading'
import { userIsAuthenticated } from '../helpers/userIsAuthenticated'
import { ProtectedRoute } from '../routes/protectedRoute'
import { getTotalPriceCart } from '../helpers/getTotalPriceCart'

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
  }

  .total {
    width: 100%;
    padding: 30px 0px;
    font-size: 30px;
    font-weight: 500;
    text-align: right;
  }

  .buy {
    display: block;
    margin-left: auto;
    width: fit-content;
    font-weight: 500;

    border: none;
    border-radius: 5px;
    background-color: ${({ theme }) => theme.blue};
    color: #fff;
    padding: 15px 25px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-size: 15px;
    margin-bottom: 10px;

    &:hover {
      background-color: #3877d6;
    }
  }
`

export default function Cart() {
  const { data: cart, isLoading } = useQuery('getUserCart', () =>
    CartAPI.getCart()
  )

  return (
    <MainContainer>
      <nav className="nav">
        <ul>
          <li>
            <h3>Carrito ({cart && cart.length})</h3>
          </li>
        </ul>
      </nav>
      {isLoading ? (
        <Loading />
      ) : (
        cart.map(({ id, cantidad, producto }) => (
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
          />
        ))
      )}

      <p className="total">Total: ${getTotalPriceCart(cart)}</p>

      <Link href="checkout/cart">
        <a href="checkout/cart" className="buy">
          Continuar compra
        </a>
      </Link>
    </MainContainer>
  )
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  const queryClient = new QueryClient()
  const { accessToken } = userIsAuthenticated(ctx)

  await queryClient.prefetchQuery('getUserCart', () =>
    CartAPI.getCart(accessToken)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
})
