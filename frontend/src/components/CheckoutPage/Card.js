import Image from 'next/image'
import Link from 'next/link'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { sliceTitle } from '../../helpers/sliceTitle'

const CardContainer = styled.div`
  position: relative;
  margin-bottom: 15px;
  background-color: #fff;
  padding: 15px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);

  .product-card {
    &-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      cursor: pointer;
    }

    &-remove {
      position: absolute;
      top: 3px;
      right: 0;
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
      margin-right: auto;
      color: black;
      font-weight: 300;
      font-size: 16px;
      word-wrap: break-word;
      overflow: auto hidden;
    }

    &-quantity {
      flex-shrink: 0;
      margin-left: 5px;
    }
  }
`

export function Card({ imageSrc, imageAlt, title, quantity }) {
  return (
    <CardContainer>
      <button type="button" className="product-card-remove">
        <i className="bx bx-x-circle" />
      </button>
      <Link href="/product" passHref>
        <a className="product-card-container" href="ignore">
          <div className="product-card-image">
            <Image
              src={imageSrc}
              alt={imageAlt}
              objectFit="cover"
              layout="fill"
            />{' '}
          </div>
          <h3 className="product-card-title">{sliceTitle(title, 76)}</h3>
          <p className="product-card-quantity">Cantidad: {quantity} </p>
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
