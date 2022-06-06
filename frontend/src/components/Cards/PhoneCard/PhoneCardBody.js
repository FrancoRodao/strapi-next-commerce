import PropTypes from 'prop-types'
import Image from 'next/image'
import styled from 'styled-components'
import { ProductPrice } from '../../ProductPrice'

const Container = styled.div`
  box-shadow: 0 1px 1px 0 rgb(0 0 0 / 10%);
  transition: box-shadow 0.3s;
  padding-bottom: 10px;

  &:hover {
    box-shadow: 0 7px 16px 0 rgb(0 0 0 / 20%), 0 1px 3px 0 rgb(0 0 0 / 10%);
  }

  .center {
    text-align: center;
    margin-bottom: 5px;
    position: relative;
    height: 300px;
    width: 100%;
  }

  .footer {
    padding: 0 15px;
    height: 97px;
  }

  .title {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    height: 3rem;

    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }
`

export default function PhoneCardBody({ title, price, image, offerPrice }) {
  return (
    <Container>
      <div className="center">
        <Image src={image} objectFit="contain" alt={title} layout="fill" />
      </div>
      <div className="footer">
        <ProductPrice price={price} offerPrice={offerPrice} />

        <h1 className="title">{title}</h1>
      </div>
    </Container>
  )
}

PhoneCardBody.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  offerPrice: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
}

PhoneCardBody.defaultProps = {
  offerPrice: false
}
