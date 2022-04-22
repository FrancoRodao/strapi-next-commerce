import styled from 'styled-components'
import { marked } from 'marked'
import Loading from '../Loading'

const Section = styled.section`
  width: 100%;
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
      <p
        dangerouslySetInnerHTML={{
          __html: marked.parse(description) || <Loading />
        }}
        className="product-description-body"
      />
    </Section>
  )
}
