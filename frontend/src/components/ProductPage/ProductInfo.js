import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useMutation } from 'react-query'
import { useRouter } from 'next/router'
import { numberToArray } from '../../helpers/numberToArray'
import { CartAPI } from '../../api/cart'
import { useUserContext } from '../../context/User/UserContext'
import { ProductPrice } from '../ProductPrice'

const Aside = styled.aside`
  border: ${({ theme }) => `1px solid ${theme.borderGreylight}`};
  border-radius: 5px;
  padding: 15px;
  height: fit-content;

  .product-info {
    &-selled {
      display: block;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.55);
      margin-bottom: 5px;
    }

    &-title {
      font-size: 21px;
      font-weight: 600;
      margin-bottom: 10px;
    }

    &-price {
      display: block;
      font-size: 21px;
      margin-top: 20px;
      margin-bottom: 15px;
      font-weight: 400;
    }

    &-stock,
    &-availables {
      display: block;
      color: ${({ theme }) => theme.success};
      margin-top: 15px;
    }

    &-stock {
      font-weight: 600;
      font-size: 14px;
    }

    &-quantity {
      margin-top: 15px;
      margin-bottom: 20px;

      &-select {
        outline-color: transparent;
        border: none;

        &:focus {
          border: none;
        }
      }

      &-total {
        vertical-align: 2px;
        font-size: 14px;
        margin-left: 5px;
        color: ${({ theme }) => theme.borderGreylight};
      }
    }

    &-buynow {
      display: block;
      text-align: center;
      width: 100%;
      border: none;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.blue};
      color: #fff;
      padding: 15px;
      cursor: pointer;
      transition: background-color 0.3s;
      font-weight: 600;
      font-size: 15px;
      margin-bottom: 10px;

      &:hover {
        background-color: #3877d6;
      }
    }

    &-addtocart {
      width: 100%;
      border: none;
      border-radius: 5px;
      background-color: #d9e7fa;
      color: ${({ theme }) => theme.blue};
      padding: 15px;
      cursor: pointer;
      transition: background-color 0.3s;
      font-weight: 600;
      font-size: 15px;

      &:hover {
        background-color: #ceddf2;
      }
    }
  }
`

export default function ProductInfo({
  id,
  title,
  price,
  offerPrice,
  quantity,
  selled
}) {
  const { state } = useUserContext()
  const router = useRouter()
  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const mutation = useMutation((newProduct) =>
    CartAPI.addItemCart([newProduct])
  )

  const buyProduct = () => {
    if (state.isAuthenticated) {
      router.push(`/checkout/${id}?quantity=${selectedQuantity}`)
      return
    }
    router.push('/login')
  }

  const addProductToCart = async () => {
    if (state.isAuthenticated) {
      mutation.mutate({
        productId: id,
        quantity: selectedQuantity
      })
      return
    }

    router.push('/login')
  }

  const changeProductQuantity = (e) =>
    setSelectedQuantity(Number(e.target.value))

  return (
    <Aside>
      <>
        <span className="product-info-selled">{selled} Vendidos</span>
        <h1 className="product-info-title">{title}</h1>
        <ProductPrice price={price} offerPrice={offerPrice} />
        <span className="product-info-stock">Stock disponible</span>
        <div className="product-info-quantity">
          <span>Cantidad: </span>
          <select
            onChange={changeProductQuantity}
            className="product-info-quantity-select"
          >
            {numberToArray(quantity).map((number) => (
              <option key={number} value={number}>
                {number} {number === 1 ? 'unidad' : 'unidades'}
              </option>
            ))}
          </select>
          <span className="product-info-quantity-total">
            ({quantity} disponibles)
          </span>
        </div>
        <button
          onClick={buyProduct}
          type="button"
          className="product-info-buynow"
        >
          Comprar ahora
        </button>
        <button
          onClick={addProductToCart}
          type="button"
          className="product-info-addtocart"
        >
          Agregar al carrito
        </button>
      </>
    </Aside>
  )
}

ProductInfo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  selled: PropTypes.number.isRequired
}
