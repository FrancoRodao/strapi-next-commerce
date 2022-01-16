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
      adaptiveHeight
    >
      {data?.imagenes ? (
        data.imagenes.map(({ id, url, caption }) => (
          <FeaturedSliderImage key={id} imageSrc={url} alt={caption} />
        ))
      ) : (
        <ImgContainer>
          <Loading />
        </ImgContainer>
      )}
    </Slider>
  )
}
