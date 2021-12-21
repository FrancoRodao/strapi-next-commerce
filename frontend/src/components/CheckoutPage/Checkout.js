import React, { useState } from 'react'
import styled from 'styled-components'
import { ErrorMessage } from '../ErrorMessage'

const CheckoutContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 56px 20px;
  width: 50%;
  overflow-y: auto;

  .bx-map {
    color: ${({ theme }) => theme.blue};
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
      margin-bottom: 5px;

      &-select-container {
        margin-bottom: 45px;
        padding: 12px 30px;
        background-color: ${({ theme }) => theme.lightGrey};
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
        color: ${({ theme }) => theme.blue};
        background-color: transparent;
        cursor: pointer;
        font-size: 14px;
      }
    }

    .withdraw {
      position: relative;
      display: flex;
      align-items: center;
      gap: 20px;
      margin-bottom: 35px;
      padding: 12px 30px;
      background-color: #fff;
      box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.15);
      border-radius: 5px;
      border-left: 5px solid transparent;
      transition: border-left 0.2s;
      border: 1px solid transparent;

      &-error {
        border: 1px solid ${({ theme }) => theme.error};
      }

      &-directionChecked {
        border-left: 5px solid ${({ theme }) => theme.blue};
      }

      &-error-msg {
        position: absolute;
        bottom: -30px;
        left: 0;
        color: ${({ theme }) => theme.red};
        font-size: 17px;
      }

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
      margin-top: 15px;

      &-button {
        width: 25%;
        margin-left: auto;
        border: none;
        border-radius: 5px;
        background-color: ${({ theme }) => theme.blue};
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
  }
`

export default function Checkout() {
  const [checkedDirection, setCheckedDirection] = useState(false)
  const [errorUI, setErrorUI] = useState(null)

  const changeDirection = (e) => {
    e.target.checked = !checkedDirection
    setCheckedDirection(!checkedDirection)
    if (!checkedDirection) {
      setErrorUI(false)
    }
  }

  const continueToPay = (e) => {
    e.preventDefault()
    if (!checkedDirection) {
      setErrorUI('Por favor confirma la dirección de retiro')
    }
  }

  return (
    <CheckoutContainer>
      <div className="checkout">
        <h1 className="checkout-title">Confirma la compra</h1>

        {/* <p className="checkout-address">Domicilio</p>
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
          </div> */}

        <p className="checkout-address">Retirar compra</p>
        <div
          className={`withdraw ${
            checkedDirection ? 'withdraw-directionChecked' : ''
          } ${errorUI ? 'withdraw-error' : ''} `}
        >
          <div className="withdraw-radio-container">
            <input
              onClick={changeDirection}
              onChange={() => {}}
              checked={checkedDirection}
              type="radio"
            />
          </div>
          <div className="withdraw-direction">
            <p>En el domicilio del vendedor</p>
            <p className="text-gray">Placeholder dirección</p>
          </div>
        </div>
        {errorUI && <ErrorMessage>{errorUI}</ErrorMessage>}

        <div className="continue">
          <a
            onClick={continueToPay}
            href="continue"
            className="continue-button"
          >
            Continuar
          </a>
        </div>
      </div>
    </CheckoutContainer>
  )
}
