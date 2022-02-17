/* eslint-disable @next/next/no-html-link-for-pages */
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
import { ProductsAPI } from '../../api/products'
import { ArrowIcon } from '../../components/Icons/Arrow'
import Loading from '../../components/Loading'
import ProductDescription from '../../components/ProductPage/ProductDescription'
import ProductFeatures from '../../components/ProductPage/ProductFeatures'
import ProductGallery from '../../components/ProductPage/ProductGallery'
import ProductImage from '../../components/ProductPage/ProductImage'
import ProductInfo from '../../components/ProductPage/ProductInfo'
import { QueryKeys } from '../../constants/queryKeys.constant'
import { useGetProduct } from '../../hooks/productHook'

const MainContainer = styled.div`
  padding: 15px 20px;
  min-height: 70vh;

  .breads {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
`

const ProductContainer = styled.div`
  background-color: #fff;
  display: grid;
  grid-template-columns: 0.2fr 1.7fr 1.1fr;
  grid-template-rows: 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  padding: 20px;

  .product {
    margin-right: 35px;
  }
`

export default function Product({ productId }) {
  const { data, isLoading } = useGetProduct(productId)

  const [image, setImage] = useState(null)

  useEffect(() => {
    setImage(data?.imagenes[0])
  }, [data])

  if (!isLoading && !data) {
    return <div>404 - Este producto no existe :(</div>
  }

  return (
    <>
      <MainContainer>
        <>
          <div className="breads">
            <Link href="/" passHref>
              <a href="/">
                <ArrowIcon
                  style={{
                    cursor: 'pointer',
                    transform: 'rotate(-90deg)',
                    marginTop: '4px'
                  }}
                />
              </a>
            </Link>
            breadcrumbs
          </div>

          {data && image ? (
            <>
              <ProductContainer>
                <ProductGallery images={data.imagenes} setImage={setImage} />

                <article className="product">
                  <ProductImage image={image} />
                  {data.caracteristicas.length > 0 && (
                    <ProductFeatures features={data.caracteristicas} />
                  )}
                  <ProductDescription description={data.descripcion} />
                </article>

                <ProductInfo
                  id={data.id}
                  title={data.titulo}
                  price={data.precio}
                  offerPrice={data.precio_oferta}
                  quantity={data.cantidad}
                  sold={data.vendidos}
                />
              </ProductContainer>
            </>
          ) : (
            <Loading />
          )}
        </>
      </MainContainer>
    </>
  )
}

export async function getServerSideProps({ params }) {
  const { productId } = params
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery([QueryKeys.GET_PRODUCT, productId], () =>
    ProductsAPI.getProduct(productId)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
      productId
    }
  }
}
