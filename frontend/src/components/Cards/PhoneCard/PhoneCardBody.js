import PropTypes from 'prop-types'
import Image from 'next/image'
import { calculatePercentage } from '../../../helpers/calculatePercentage'
import { sliceTitle } from '../../../helpers/sliceTitle'

export default function PhoneCardBody({ title, price, image, offerPrice }) {
  return (
    <>
      <div className="center">
        <Image src={image} alt="xiaomi9a" width="160" height="300" />
      </div>
      <div className="footer">
        {offerPrice ? <h3 className="offerPrice price">U$S {price}</h3> : null}

        <h2 className={`price ${offerPrice ? 'real-price' : null}`}>
          U$S {offerPrice || price}{' '}
          {offerPrice ? (
            <span className="offer-percentage">
              {calculatePercentage(price, offerPrice)}% OFF
            </span>
          ) : null}
        </h2>

        <h1 className="title">{sliceTitle(title)}</h1>
      </div>
    </>
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
