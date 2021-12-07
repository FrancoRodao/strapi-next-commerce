import { dehydrate, QueryClient, useQuery } from 'react-query'
import styled from 'styled-components'
import { getUserCart } from '../api/user'
import { CartCard } from '../components/Cards/CartCard.js/CartCard'
import Loading from '../components/Loading'
import { ProtectedRoute } from '../routes/protectedRoute'

const MainContainer = styled.div`
  background-color: #fff;
  padding: 30px;

  .nav {
    display: flex;
    ul {
      border-bottom: 2px solid black;
      padding: 20px 50px;
    }
  }
`

export default function Cart() {
  const { data, isLoading } = useQuery('getUserCart', getUserCart)

  const cart = data?.data

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
            cartItemQuantity={cantidad}
          />
        ))
      )}
    </MainContainer>
  )
}

export const getServerSideProps = ProtectedRoute(async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('getUserCart', getUserCart)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
})
