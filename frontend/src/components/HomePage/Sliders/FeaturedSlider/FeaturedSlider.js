import Slider from 'react-slick'
import NextArrow from '../Arrows/NextArrow'
import BackArrow from '../Arrows/BackArrow'
import Loading from '../../../Loading'
import FeaturedSliderImage, { ImgContainer } from './Image'
import { useGetMainCarouselImages } from '../../../../hooks/apparenceHook'

export default function FeaturedSlider() {
  const { data } = useGetMainCarouselImages()

  return (
    <Slider
      dots
      infinite
      speed={500}
      slidesToShow={1}
      slidesToScroll={1}
      nextArrow={<NextArrow />}
      prevArrow={<BackArrow />}
      autoplay={false}
      autoplaySpeed={2000}
      pauseOnDotsHover
    >
      {data?.length > 0 ? (
        data.map(({ id, URL, imagen }) => (
          <FeaturedSliderImage
            key={id}
            imageOnClickUrl={URL}
            imageSrc={imagen.url}
            alt={imagen.caption}
            width={imagen.width}
            height={imagen.height}
          />
        ))
      ) : (
        <ImgContainer>
          <Loading />
        </ImgContainer>
      )}
    </Slider>
  )
}
