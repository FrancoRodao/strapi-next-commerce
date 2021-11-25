import Image from 'next/image'
import styled from 'styled-components'
import PropTypes from 'prop-types'

export const ImgContainer = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: 50vh;
  min-height: 350px;

  .img {
    cursor: pointer;
  }
`

export default function FeaturedSliderImage({ imageSrc, alt }) {
  return (
    <ImgContainer>
      <Image className="img" layout="fill" alt={alt} src={imageSrc} />
    </ImgContainer>
  )
}

FeaturedSliderImage.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired
}
