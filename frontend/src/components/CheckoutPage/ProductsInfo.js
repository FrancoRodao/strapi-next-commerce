import styled from 'styled-components'
import { getTotalPriceCart } from '../../helpers/getTotalPriceCart'
import { Card } from './Card'

const Container = styled.div`
  width: 40%;
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
      padding: 0px 5px;
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
`

/* 
  The quantity that comes per URL (query parameters) cannot be greater
  than the quantity that actually exists. 
*/
const selectedQuantityValidation = (product) =>
  product.selectedQuantity > product.cantidad
    ? product.cantidad
    : product.selectedQuantity

export default function ProductsInfo({ productOrCart }) {
  const productQuantity = selectedQuantityValidation(productOrCart)

  const oneSpecificProduct = !Array.isArray(productOrCart)
  const totalPrice = oneSpecificProduct
    ? productOrCart.precio * productQuantity
    : getTotalPriceCart(productOrCart)

  return (
    <Container>
      <div className="product-info">
        <div className="product-cards">
          {productOrCart && oneSpecificProduct ? (
            <Card
              productId={productOrCart.id}
              imageSrc={productOrCart.imagenes[0].url}
              title={productOrCart.titulo}
              imageAlt={productOrCart.imagenes[0].alternativeText}
              price={productOrCart.precio}
              quantity={productQuantity}
            />
          ) : (
            // CART PRODUCTS
            productOrCart.map((cartItem) => (
              <Card
                key={cartItem.id}
                productId={cartItem.producto.id}
                imageSrc={cartItem.producto.imagenes[0].url}
                title={cartItem.producto.titulo}
                imageAlt={cartItem.producto.imagenes[0].alternativeText}
                price={cartItem.producto.precio}
                quantity={cartItem.cantidad}
              />
            ))
          )}
        </div>
        <div className="total">
          <p className="total-content">Total</p>
          <p className="total-content">$ {totalPrice}</p>
        </div>
      </div>
    </Container>
  )
}
