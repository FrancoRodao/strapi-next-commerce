import styled from 'styled-components'
import { dehydrate, QueryClient } from 'react-query'
import { useEffect } from 'react'
import FeaturedSlider from '../components/HomePage/Sliders/FeaturedSlider/FeaturedSlider'
import BrandLogoSlider from '../components/HomePage/Sliders/BrandLogoSlider'
import { PhoneCards } from '../components/Cards/PhoneCard/PhoneCards'
import { ProductsAPI } from '../api/products'
import {
  useGetBestSellersProducts,
  useGetOfferProducts
} from '../hooks/productHook'
import { QueryKeys } from '../constants/queryKeys.constant'
import { AppearanceAPI } from '../api/appearance'
import {
  ModalContextProvider,
  useModalContext
} from '../context/Modal/ModalContext'
import { Modal } from '../components/Modal'
import { SandboxModalContent } from '../components/HomePage/SandboxModalContent'

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
  flex-wrap: wrap;
  gap: 12px;
`

function Home() {
  const bestSellers = useGetBestSellersProducts()
  const offerProducts = useGetOfferProducts()
  const { toggleModal, modalInfo, setModalInfo } = useModalContext()

  useEffect(() => {
    setModalInfo({
      title: 'Sandbox',
      content: <SandboxModalContent />
    })
    toggleModal()
  }, [])

  return (
    <>
      <Modal title={modalInfo.title} content={modalInfo.content} />
      <Container>
        <section className="first-section">
          <FeaturedSlider />
        </section>
        <section className="container">
          <h1 className="section-title">Lo mas vendido</h1>
          <PhoneCardsContainer>
            <PhoneCards queryData={bestSellers} placeHoldersCards={5} />
          </PhoneCardsContainer>
        </section>

        <section className="container">
          <h1 className="section-title">Trabajamos con las mejores marcas</h1>
          <BrandLogoSlider />
        </section>

        <section className="container">
          <h1 className="section-title">Ofertas</h1>
          <PhoneCardsContainer>
            <PhoneCards queryData={offerProducts} placeHoldersCards={5} />
          </PhoneCardsContainer>
        </section>
      </Container>
    </>
  )
}

export default function PageWithModalContext() {
  return (
    <ModalContextProvider>
      <Home />
    </ModalContextProvider>
  )
}

export async function getServerSideProps() {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(QueryKeys.GET_BEST_SELLERS_PRODUCTS, () =>
    ProductsAPI.getBestSellers()
  )
  await queryClient.prefetchQuery(QueryKeys.GET_OFFER_PRODUCTS, () =>
    ProductsAPI.getOfferProducts()
  )
  await queryClient.prefetchQuery(QueryKeys.GET_MAIN_CARROUSEL_IMAGES, () =>
    AppearanceAPI.getMainCarouselImages()
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
}
