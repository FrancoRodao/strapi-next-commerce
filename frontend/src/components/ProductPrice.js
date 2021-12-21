import styled from 'styled-components'
import { calculatePercentage } from '../helpers/calculatePercentage'

const Container = styled.span`
  margin: 10px 0;

  .price {
    font-weight: 500;
    margin-top: 25px;
    margin-bottom: 10px;
    color: #333;
  }

  .real-price {
    margin-top: 5px;
  }

  .offerPrice {
    color: #666;
    margin-bottom: 0px;
    margin-top: 5px;
    text-decoration: line-through;
    font-size: 14px;
  }

  .offer-percentage {
    font-size: 14px;
    color: #39b54a;
    vertical-align: 3px;
  }
`

export function ProductPrice({ price = 0, offerPrice = null }) {
  return (
    <Container>
      {offerPrice ? <h3 className="offerPrice price">U$S {price}</h3> : null}

      <h2 className={`price ${offerPrice ? 'real-price' : null}`}>
        U$S {offerPrice || price}{' '}
        {offerPrice ? (
          <span className="offer-percentage">
            {calculatePercentage(price, offerPrice)}% OFF
          </span>
        ) : null}
      </h2>
    </Container>
  )
}
