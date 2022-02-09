import styled from 'styled-components'
import Link from 'next/link'
import { Button } from '../Button'
import { ProductCardContainer } from '../CheckoutPage/Card'
import { useChangingPage } from '../../hooks/useChangingPage'

const OrderContainer = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  padding: 10px;

  .products {
    width: 80%;
  }

  .order {
    width: 20%;
  }

  .products {
    &__title {
      margin: 5px;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      word-break: break-word;
      overflow: hidden;
    }

    &__quantity {
      color: ${({ theme }) => theme.blue};
      font-weight: 600;
      margin-right: 5px;
    }
  }
`

export function OrderCard({ products, orderId }) {
  const { changingPage, setChangingPage } = useChangingPage()

  return (
    <ProductCardContainer>
      <OrderContainer>
        <div className="products">
          {products.map((productInfo) => (
            <p className="products__title">
              <span className="products__quantity">
                x{productInfo.cantidad}
              </span>
              {productInfo.producto.titulo}
            </p>
          ))}
        </div>
        <div className="order">
          <Link href={`/profile/orders/${orderId}`}>
            <a
              onClick={() => setChangingPage(true)}
              href={`/profile/orders/${orderId}`}
            >
              <Button isLoading={changingPage}>Ver pedido</Button>
            </a>
          </Link>
        </div>
      </OrderContainer>
    </ProductCardContainer>
  )
}
