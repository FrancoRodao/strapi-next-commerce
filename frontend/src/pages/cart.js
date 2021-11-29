import styled from 'styled-components'
import { CartCard } from '../components/Cards/CartCard.js/CartCard'
import { CartContext, useCartContext } from '../context/Cart/CartContext'

const MainContainer = styled.div`
  .nav {
    display: flex;
    justify-content: center;
    background-color: ${({ theme }) => `${theme.navbarBgColor}`};
    margin-bottom: 20px;
  }
`

export default function Cart() {
  // TODO: FIX IT
  const state = useCartContext()

  return (
    <CartContext>
      <MainContainer>
        <nav className="nav">
          <ul>
            <li>
              <h3>Carrito (numero de productos)</h3>
            </li>
          </ul>
        </nav>
        {}
        <CartCard />
        <CartCard />
      </MainContainer>
    </CartContext>
  )
}
