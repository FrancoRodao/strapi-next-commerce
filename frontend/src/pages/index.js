import styled from 'styled-components'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import FeaturedSlider from '../components/HomePage/Sliders/FeaturedSlider/FeaturedSlider'
import BrandLogoSlider from '../components/HomePage/Sliders/BrandLogoSlider'
import { PhoneCards } from '../components/Cards/PhoneCard/PhoneCards'
import { ProductsAPI } from '../api/products'

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
  const bestSellers = useQuery('getBestSellers', () =>
    ProductsAPI.getBestSellers()
  )
  const offerProducts = useQuery('getOfferProducts', () =>
    ProductsAPI.getOfferProducts()
  )

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

  await queryClient.prefetchQuery('products', () => ProductsAPI.getProducts())
  await queryClient.prefetchQuery('getBestSellers', () =>
    ProductsAPI.getBestSellers()
  )
  await queryClient.prefetchQuery('getOfferProducts', () =>
    ProductsAPI.getOfferProducts()
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
