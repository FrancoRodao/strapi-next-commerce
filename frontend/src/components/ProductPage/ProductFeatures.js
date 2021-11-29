import styled from 'styled-components'
import Loading from '../Loading'

const Section = styled.section`
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;

  .text-left {
    text-align: left;
  }

  .product-features {
    &-title {
      font-weight: 400;
      font-size: 24px;
      margin: 20px 0px;
    }

    &-table {
      width: 100%;
      margin-bottom: 20px;
    }

    &-tr {
      display: flex;
    }

    &-item {
      padding: 15px 24px 15px 16px;
      width: 50%;
    }

    &-tr:nth-child(odd) {
      background-color: rgba(0, 0, 0, 0.04);
    }
    &-tr:nth-child(even) {
      background-color: #fff;
    }
  }
`

export default function ProductFeatures({ features }) {
  return (
    <Section>
      <h1 className="product-features-title">Características del producto</h1>
      <table className="product-features-table">
        <tbody>
          {features.map(({ descripcion, titulo, id }) => (
            <tr key={id} className="product-features-tr">
              <th className="product-features-item text-left">{descripcion}</th>
              <td className="product-features-item">{titulo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  )
}
