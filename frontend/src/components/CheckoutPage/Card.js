import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { calculatePercentage } from '../../helpers/calculatePercentage'

const CardContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

  .product-card {
    &-container {
      display: flex;
      align-items: center;
      width: 100%;
      cursor: pointer;
    }

    &-remove {
      position: absolute;
      top: 5px;
      right: 5px;
      border: none;
      background-color: transparent;
      color: #c44239;
      cursor: pointer;

      &:hover {
        color: #eb3b2f;
      }
    }

    &-image {
      position: relative;
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-right: 15px;
      overflow: hidden;
      flex-shrink: 0;
    }

    &-title {
      width: 50%;
      color: black;
      font-weight: 300;
      font-size: 16px;
      overflow: auto hidden;

      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      word-break: break-word;
    }

    &-info {
      margin-right: auto;
      margin-left: 10px;
      flex-shrink: 0;

      &-item {
        margin: 7px 0;
      }
    }
  }
`

const Price = styled.span`
  display: flex;
  gap: 3px;

  .offerPrice {
    margin-top: 2px;
    font-size: 14px;
    color: #39b54a;
  }
`

const OfferPrice = ({ price, offerPrice }) => (
  <Price>
    $ {offerPrice} c/u
    <span className="offerPrice">
      {calculatePercentage(price, offerPrice)} % OFF
    </span>
  </Price>
)

export function Card({
  productId,
  imageSrc,
  imageAlt,
  title,
  quantity,
  price,
  offerPrice
}) {
  return (
    <CardContainer>
      <button
        title="Eliminar del carrito"
        type="button"
        className="product-card-remove"
      >
        <i className="bx bx-x-circle" />
      </button>
      <Link href={`/${productId}`} passHref>
        <a className="product-card-container" href="ignore">
          <div className="product-card-image">
            <Image
              src={imageSrc}
              alt={imageAlt}
              objectFit="cover"
              layout="fill"
            />
          </div>
          <h3 className="product-card-title">{title}</h3>
          <div className="product-card-info">
            <p className="product-card-info-item">Cantidad: {quantity} </p>
            <p className="product-card-info-item">
              $ {(offerPrice || price) * quantity}
            </p>
            <p className="product-card-info-item">
              {offerPrice ? (
                <OfferPrice price={price} offerPrice={offerPrice} />
              ) : (
                `$ ${price} c/u`
              )}
            </p>
          </div>
        </a>
      </Link>
    </CardContainer>
  )
}

Card.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  quantity: PropTypes.number.isRequired
}
