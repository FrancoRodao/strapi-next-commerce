import Image from 'next/image'
import PropTypes from 'prop-types'
import { useRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
  position: absolute;

  .gallery {
    list-style: none;
    padding: 0;
    text-align: center;

    &-item {
      position: relative;
      cursor: pointer;
      margin-bottom: 15px;
      padding: 3px;
      border-radius: 5px;
      border: ${({ theme }) => `1px solid ${theme.borderGreylight}`};
      height: 50px;
      width: 50px;

      &-selected {
        border: 1px solid blue;
      }
    }
  }
`

export default function ProductGallery({ images, setImage }) {
  const imagesRef = useRef([])

  const selectImage = (img) => (event) => {
    // TODO: IMPROVE IT
    // unselect images
    imagesRef.current.forEach((imgRef) =>
      imgRef.classList.remove('gallery-item-selected')
    )

    // click on li
    if (event.target.classList.contains('gallery-item')) {
      event.target.classList.add('gallery-item-selected')
      setImage(img)
      return
    }

    // click on image
    event.target.parentElement.parentElement.classList.add(
      'gallery-item-selected'
    )
    setImage(img)
  }

  return (
    <Container>
      <ul className="gallery">
        {images?.map((img, i) => (
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <li
            // eslint-disable-next-line no-return-assign
            ref={(el) => (imagesRef.current[i] = el)}
            key={img.id}
            onClick={selectImage(img)}
            className={`gallery-item ${i === 0 ? 'gallery-item-selected' : ''}`}
          >
            <Image
              alt={img?.name?.split('.')[0]}
              src={img.url}
              width={50}
              height={50}
              layout="intrinsic"
              objectFit="contain"
            />
          </li>
        ))}
      </ul>
    </Container>
  )
}

ProductGallery.propTypes = {
  images: PropTypes.arrayOf(PropTypes.object).isRequired
}
