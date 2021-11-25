import styled from 'styled-components'
import ProductsInfo from '../../components/CheckoutPage/ProductsInfo'

const Container = styled.div`
  display: flex;

  .bx-map {
    color: #3483fa;
    font-size: 26px;
    background-color: #fff;
    border-radius: 100%;
    padding: 10px;
    margin-right: 25px;
  }

  .checkout {
    &-container {
      position: sticky;
      top: 0;
      height: 100vh;
      padding: 56px 20px;
      width: 60%;
      overflow-y: auto;
    }

    &-title {
      font-size: 22px;
      font-weight: 500;
      margin-bottom: 30px;
    }

    &-address {
      font-weight: 500;

      &-select-container {
        margin-bottom: 45px;
        padding: 12px 30px;
        background-color: #f5f5f5;
      }

      &-select {
        display: flex;
        align-items: center;
      }

      &-selected p {
        margin: 5px;
      }

      &-change {
        margin-left: auto;
        border: none;
        color: #3483fa;
        background-color: transparent;
        cursor: pointer;
        font-size: 14px;
      }
    }
  }

  .withdraw {
    display: flex;
    align-items: center;
    gap: 20px;
    margin-bottom: 45px;
    padding: 12px 30px;
    background-color: #fff;
    box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
    border-left: 5px solid #3483fa;
    border-radius: 5px;

    &-radio-container {
      height: 16px;
      width: 16px;

      input {
        height: 100%;
        width: 100%;
      }
    }

    &-direction {
      display: flex;
      flex-direction: column;

      p {
        margin: 5px;
      }

      p.text-gray {
        color: ${({ theme }) => theme.borderGreylight};
      }
    }
  }

  .continue {
    width: 100%;
    display: flex;

    &-button {
      width: 25%;
      margin-left: auto;
      border: none;
      border-radius: 5px;
      background-color: #3483fa;
      color: #fff;
      padding: 15px;
      cursor: pointer;
      transition: background-color 0.2s;
      font-weight: 500;
      font-size: 15px;
      text-align: center;

      &:hover {
        background-color: #3877d6;
      }
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 30px 0px;
    border-top: ${({ theme }) => `1px solid ${theme.borderGreylight}`};

    &-content {
      font-size: 21px;
      font-weight: 500;
    }
  }
`

export default function CheckoutProduct() {
  return (
    <Container>
      <div className="checkout-container">
        <div className="checkout">
          <h1 className="checkout-title">
            ¿Cómo querés recibir o retirar tu compra?
          </h1>

          <p className="checkout-address">Domicilio</p>
          <div className="checkout-address-select-container">
            <div className="checkout-address-select">
              <i className="bx bx-map" />
              <div className="checkout-address-selected">
                <p>one</p>
                <p>two</p>
              </div>
              <button type="button" className="checkout-address-change">
                Modificar ubicación
              </button>
            </div>
          </div>

          <p className="checkout-address">Retirar compra</p>
          <div className="withdraw">
            <div className="withdraw-radio-container">
              <input type="radio" />
            </div>
            <div className="withdraw-direction">
              <p>En el domicilio del vendedor</p>
              <p className="text-gray">direcction</p>
            </div>
          </div>

          <div className="continue">
            <a href="continue" className="continue-button">
              Continuar
            </a>
          </div>
        </div>
      </div>

      <ProductsInfo />
    </Container>
  )
}
