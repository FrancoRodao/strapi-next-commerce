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
	// offer price is optional
	const data = id && title && price && image

	return (
		<div style={{ width: '250px', flexGrow: '1' }}>
			<Link href={`/product/${id}`} passHref>
				<a href={`/product/${id}`}>
					<PhoneCardContainer>
						{data ? (
							<PhoneCardBody
								title={title}
								price={price}
								image={image}
								offerPrice={offerPrice}
							/>
						) : (
							<Loading />
						)}
					</PhoneCardContainer>
				</a>
			</Link>
		</div>
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
