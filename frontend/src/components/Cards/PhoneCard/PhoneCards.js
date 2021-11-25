import PropTypes from 'prop-types'
import Link from 'next/link'
import { numberToArray } from '../../../helpers/numberToArray'
import { PhoneCardContainer } from './PhoneCardContainer.style'
import Loading from '../../Loading'
import PhoneCardBody from './PhoneCardBody'

/**
 * @param queryData - data from server
 * @param placeHolderCards - number of cards to be displayed when the server is not responding
 */
export function PhoneCards({ queryData, placeHoldersCards }) {
  return (
    <>
      {queryData.data
        ? queryData.data.map((phoneData) => (
            <PhoneCard
              key={phoneData.id}
              id={phoneData.id}
              image={phoneData.imagenes[0].url}
              price={phoneData.precio}
              title={phoneData.titulo}
              offerPrice={phoneData.precio_oferta}
            />
          ))
        : numberToArray(placeHoldersCards).map((number) => (
            <PhoneCard key={number} />
          ))}
    </>
  )
}

function PhoneCard({ id, title, price, image, offerPrice }) {
  const bodyCardProps = {
    title,
    price,
    image,
    offerPrice
  }

  // offer price is optional
  const data = id && title && price && image

  return (
    <Link href={`/${id}`} passHref>
      <a style={{ width: '100%' }} href="passHref">
        <PhoneCardContainer>
          {/* eslint-disable-next-line react/jsx-props-no-spreading */}
          {data ? <PhoneCardBody {...bodyCardProps} /> : <Loading />}
        </PhoneCardContainer>
      </a>
    </Link>
  )
}

PhoneCards.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  queryData: PropTypes.object.isRequired,
  placeHoldersCards: PropTypes.number.isRequired
}

PhoneCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  offerPrice: PropTypes.oneOfType([PropTypes.bool, PropTypes.number])
}

PhoneCard.defaultProps = {
  offerPrice: false
}
