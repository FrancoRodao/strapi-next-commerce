import Slider from 'react-slick'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import NextArrow from '../Arrows/NextArrow'
import BackArrow from '../Arrows/BackArrow'
import { getMainCarouselImages } from '../../../../api/apparence/getMainCarouselImages'
import Loading from '../../../Loading'
import FeaturedSliderImage, { ImgContainer } from './Image'

export default function FeaturedSlider() {
  const { data } = useQuery('main-carousel-images', getMainCarouselImages)

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

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('main-carousel-images', getMainCarouselImages)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
