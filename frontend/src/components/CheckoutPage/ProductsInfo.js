import styled from 'styled-components'
import { Card } from './Card'

const ProductContainer = styled.div`
  width: 40%;
  background-color: #f5f5f5;
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
`

export default function ProductsInfo() {
  return (
    <ProductContainer>
      <div className="product-info">
        <div className="product-cards">
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto largooooooooooooooooooooooooooooooooooooooooooooooooooooooooo"
            imageAlt="imagen del producto"
            quantity={32}
          />
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />{' '}
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />{' '}
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />{' '}
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />{' '}
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />{' '}
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />{' '}
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />{' '}
          <Card
            imageSrc="/xiaomi9a.webp"
            title="titulo del producto"
            imageAlt="imagen del producto"
            quantity={32}
          />
        </div>
        <div className="total">
          <p className="total-content">Total</p>
          <p className="total-content">$ 323223</p>
        </div>
      </div>
    </ProductContainer>
  )
}
