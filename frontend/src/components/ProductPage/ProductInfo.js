import { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { numberToArray } from '../../helpers/numberToArray'
import { ProductPrice } from '../ProductPrice'
import { useAddCartItem } from '../../hooks/cartHook'
import { Button } from '../Button'
import { useChangingPage } from '../../hooks/useChangingPage'
import { userIsAuthenticated } from '../../helpers/userIsAuthenticated'

const Aside = styled.aside`
  border: ${({ theme }) => `1px solid ${theme.borderGreylight}`};
  border-radius: 5px;
  padding: 15px;
  height: fit-content;
  width: 40%;
  max-width: 500px;
  margin-bottom: 15px;

  .product-info {
    &-sold {
      display: block;
      font-size: 14px;
      color: rgba(0, 0, 0, 0.55);
      margin-bottom: 5px;
    }

    &-title {
      font-size: 21px;
      font-weight: 600;
      margin-bottom: 10px;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
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
        background-color: transparent;

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

    &-addtocart {
      background-color: #d9e7fa;
      color: ${({ theme }) => theme.blue};

      &:hover {
        background-color: #ceddf2;
      }
    }
  }

  .button {
    margin: 10px 0;
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: none;
  }
`

export default function ProductInfo({
  id,
  title,
  price,
  offerPrice,
  quantity,
  sold
}) {
  // TODO: IMPROVE THIS (CLIENT SIDE AUTH)
  const { isAuthenticated } = userIsAuthenticated()
  const router = useRouter()

  const [selectedQuantity, setSelectedQuantity] = useState(1)
  const { addCartItem } = useAddCartItem(id, selectedQuantity)

  const { changingPage, setChangingPage } = useChangingPage()

  const buyProduct = () => {
    setChangingPage(true)
    if (isAuthenticated) {
      router.push(`/checkout/${id}?quantity=${selectedQuantity}`)
      return
    }

    toast.error('Debe iniciar sesión antes de comprar')
    router.push('/signin')
  }

  const addProductToCart = async () => {
    if (isAuthenticated) {
      addCartItem({
        productId: id,
        quantity: selectedQuantity
      })
      toast.success('Producto agregado al carrito')
      return
    }

    toast.error('Debe iniciar sesión antes de agregar productos al carrito')
    router.push('/signin')
  }

  const changeProductQuantity = (e) =>
    setSelectedQuantity(Number(e.target.value))

  return (
    <Aside>
      <>
        <span className="product-info-sold">{sold} Vendidos</span>
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
        <Button
          isLoading={changingPage}
          className="button"
          onClick={buyProduct}
          type="button"
        >
          Comprar ahora
        </Button>
        <Button
          onClick={addProductToCart}
          type="button"
          className="product-info-addtocart button"
        >
          Agregar al carrito
        </Button>
      </>
    </Aside>
  )
}

ProductInfo.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  sold: PropTypes.number.isRequired
}
