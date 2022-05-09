import styled from 'styled-components'
import { getTotalPriceCart } from '../../helpers/getTotalPriceCart'
import { Card } from './Card'

const Container = styled.div`
  width: 50%;
  background-color: ${({ theme }) => theme.lightGrey};
  min-height: 100vh;

  .product {
    &-info {
      position: sticky;
      top: 0;
      display: flex;
      align-items: center;
      width: 100%;
      padding: 56px 20px;
      flex-direction: column;
    }

    &-cards {
      overflow-y: visible;
      width: 100%;
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 30px 0px;
    border-top: ${({ theme }) => `1px solid ${theme.borderGreylight}`};

    &-content {
      font-size: 21px;
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;

    .product-info {
      position: static;
      padding: 0;
    }

    .total {
      padding: 30px 10px;
    }
  }
`

export function CheckoutProductInfo({ product, selectedQuantity }) {
  const totalPrice =
    (product.precio_oferta || product.precio) * selectedQuantity

  return (
    <Container>
      <div className="product-info">
        <div className="product-cards">
          <Card
            productId={product.id}
            imageSrc={product.imagenes[0].url}
            title={product.titulo}
            imageAlt={product.imagenes[0].alternativeText}
            price={product.precio}
            offerPrice={product.precio_oferta}
            selectedQuantity={selectedQuantity}
            productQuantity={product.cantidad}
          />
        </div>
        <div className="total">
          <p className="total-content">Total</p>
          <p className="total-content">USD {totalPrice}</p>
        </div>
      </div>
    </Container>
  )
}

export function CheckoutCartInfo({ cart }) {
  const totalPrice = getTotalPriceCart(cart)

  return (
    <Container>
      <div className="product-info">
        <div className="product-cards">
          {cart.map((cartItem) => (
            <Card
              key={cartItem.id}
              cartItemId={cartItem.id}
              productId={cartItem.producto.id}
              imageSrc={cartItem.producto.imagenes[0].url}
              title={cartItem.producto.titulo}
              imageAlt={cartItem.producto.imagenes[0].alternativeText}
              price={cartItem.producto.precio}
              offerPrice={cartItem.producto.precio_oferta}
              selectedQuantity={cartItem.cantidad}
              productQuantity={cartItem.producto.cantidad}
              productPublishedAt={cartItem.producto.published_at}
            />
          ))}
        </div>
        <div className="total">
          <p className="total-content">Total</p>
          <p className="total-content">$ {totalPrice}</p>
        </div>
      </div>
    </Container>
  )
}
