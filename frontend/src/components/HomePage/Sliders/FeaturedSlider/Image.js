import Image from 'next/image'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Link from 'next/link'

export const ImgContainer = styled.div`
	display: block;
	position: relative;
	max-width: 100%;
	height: auto;

	.img {
		cursor: pointer;
	}
`

export default function FeaturedSliderImage({
	imageSrc,
	imageOnClickUrl,
	alt,
	width,
	height
}) {
	return (
		<ImgContainer>
			<Link href={imageOnClickUrl}>
				<a href={imageOnClickUrl}>
					<Image
						className='img'
						layout='responsive'
						alt={alt}
						src={imageSrc}
						width={width}
						height={height}
					/>
				</a>
			</Link>
		</ImgContainer>
	)
}

FeaturedSliderImage.propTypes = {
	imageSrc: PropTypes.string.isRequired,
	imageOnClickUrl: PropTypes.string.isRequired,
	alt: PropTypes.string.isRequired,
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
}
