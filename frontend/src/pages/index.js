import styled from 'styled-components'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import FeaturedSlider from '../components/HomePage/Sliders/FeaturedSlider/FeaturedSlider'
import BrandLogoSlider from '../components/HomePage/Sliders/BrandLogoSlider'
import {
  getBestSellers,
  getOfferProducts,
  getProducts
} from '../api/products/getProducts'
import { PhoneCards } from '../components/Cards/PhoneCard/PhoneCards'

const Container = styled.div`
  section {
    padding-top: 2rem;
    padding-bottom: 2rem;
  }

  section.first-section {
    padding-top: 0;
  }

  .container {
    margin-right: 20px;
    margin-left: 20px;
  }

  .section-title {
    color: #666;
    font-weight: 400;
    font-size: 18px;
    font-style: italic;
    margin-bottom: 15px;
  }
`

const PhoneCardsContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 12px;
`

export default function Home() {
  const bestSellers = useQuery('getBestSellers', getBestSellers)
  const offerProducts = useQuery('getOfferProducts', getOfferProducts)

  return (
    <Container>
      <section className="first-section">
        <FeaturedSlider />
      </section>
      <section className="container">
        <h1 className="section-title">Lo mas vendido</h1>
        <PhoneCardsContainer>
          <PhoneCards queryData={bestSellers} placeHolderCards={5} />
        </PhoneCardsContainer>
      </section>

      <section className="container">
        <h1 className="section-title">Trabajamos con las mejores marcas</h1>
        <BrandLogoSlider />
      </section>

      <section className="container offers">
        <h1 className="section-title">Ofertas</h1>
        <PhoneCardsContainer>
          <PhoneCards queryData={offerProducts} placeHolderCards={5} />
        </PhoneCardsContainer>
      </section>
    </Container>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery('products', getProducts)
  await queryClient.prefetchQuery('getBestSellers', getBestSellers)
  await queryClient.prefetchQuery('getOfferProducts', getOfferProducts)

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
