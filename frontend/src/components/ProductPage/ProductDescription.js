import styled from 'styled-components'
import Loading from '../Loading'

const Section = styled.section`
  .product-description {
    &-body {
      word-wrap: break-all;
    }
    &-title {
      font-weight: 400;
      font-size: 24px;
      margin: 20px 0px;
    }
  }
`

export default function ProductDescription({ description }) {
  return (
    <Section>
      <h1 className="product-description-title">Descripción</h1>
      <p className="product-description-body">{description || <Loading />}</p>
    </Section>
  )
}
