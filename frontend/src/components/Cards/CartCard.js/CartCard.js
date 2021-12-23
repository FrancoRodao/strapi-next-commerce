import { useState } from 'react'
import { useMutation, useQueryClient } from 'react-query'
import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import { CartAPI } from '../../../api/cart'
import Loading from '../../Loading'
import { ProductPrice } from '../../ProductPrice'

const Container = styled.article`
  padding: 30px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.gray};

  .info {
    &-container {
      display: flex;
      align-items: center;
      width: 100%;
    }

    &-body {
      display: flex;
      width: 45%;
      flex-direction: column;
      margin-right: 35px;
    }
  }

  .image-container {
    margin-right: 15px;
    width: 5%;
    text-align: center;
  }

  .title {
    font-size: 18px;
    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }

  .btn {
    border: none;
    background-color: transparent;
    color: ${({ theme }) => theme.blue};

    &:hover {
      cursor: pointer;
    }

    &-container {
      display: inline;
      margin-top: 15px;
    }
  }

  .quantity {
    width: 100%;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.borderGreylight};
    border-radius: 5px;

    &-container {
      width: 12%;
      display: flex;
      flex-direction: column;
    }

    &-loading {
      position: absolute;
      top: 10%;
      right: -40%;
      font-size: 9px;
    }

    &--disabled {
      opacity: 0.5;
    }

    &-btn {
      font-size: 25px;
      cursor: pointer;
      padding: 5px;
      border-color: transparent;
      background-color: inherit;
      color: ${({ theme }) => theme.blue};

      &-subtract {
        margin-bottom: 4px;
      }
    }

    &-num {
      text-align: center;
    }

    &-stock {
      color: ${({ theme }) => theme.gray};
      margin-top: 10px;
      font-size: 14px;
      text-align: center;
    }
  }

  .price-container {
    font-weight: 500;
    font-size: 15px;
    width: 15%;
    margin-left: auto;
    margin-bottom: 15px;
  }

  .btn-disabled {
    color: ${({ theme }) => theme.borderGreylight};
  }
`

export function CartCard({
  cartItemId,
  productId,
  title,
  price,
  offerPrice,
  image,
  cartItemQuantity,
  productQuantity
}) {
  const queryClient = useQueryClient()
  const [quantity, setQuantity] = useState(cartItemQuantity)
  const [isLoading, setIsLoading] = useState(false)

  const sumCartItemMutation = useMutation(
    () => CartAPI.addItemCart([{ productId, quantity: 1 }]),
    {
      onSuccess: () => {
        setQuantity(quantity + 1)
        setIsLoading(false)
      },
      onMutate: () => setIsLoading(true)
    }
  )

  const subtractCartItemMutation = useMutation(
    () => CartAPI.subtractOne(cartItemId),
    {
      onSuccess: () => {
        setQuantity(quantity - 1)
        setIsLoading(false)
      },
      onMutate: () => setIsLoading(true)
    }
  )

  const deleteItemCart = useMutation(() => CartAPI.deleteItemCart(cartItemId), {
    onSuccess: () => {
      queryClient.invalidateQueries('getUserCart')
      setIsLoading(false)
    },
    onMutate: () => setIsLoading(true)
  })

  const handleSumCartItem = () => sumCartItemMutation.mutate()
  const handleSubtractCartItem = () => subtractCartItemMutation.mutate()
  const handleDeleteItemCart = () => deleteItemCart.mutate()

  return (
    <Container>
      <div className="info-container">
        <div className="image-container">
          <Image
            src={image.url}
            alt={image.alternativeText}
            width={30}
            height={50}
          />
        </div>
        <div className="info-body">
          <Link href={`/${productId}`}>
            <a href={`/${productId}`}>
              <h1 className="title">{title}</h1>
            </a>
          </Link>
          <div className="btn-container">
            <button
              onClick={handleDeleteItemCart}
              type="button"
              className="btn"
            >
              Eliminar
            </button>
          </div>
        </div>
        <div className="quantity-container">
          <div className={`quantity ${isLoading ? 'quantity--disabled' : ''}`}>
            <button
              onClick={handleSubtractCartItem}
              className={`quantity-btn quantity-btn-subtract subtract ${
                quantity === 1 ? 'btn-disabled' : ''
              }`}
              type="button"
              disabled={isLoading || quantity === 1}
            >
              -
            </button>
            <p className="quantity-num">{quantity}</p>
            <button
              onClick={handleSumCartItem}
              className="quantity-btn"
              type="button"
              disabled={isLoading}
            >
              +
            </button>
            {isLoading && (
              <div className="quantity-loading">
                <Loading />
              </div>
            )}
          </div>
          <p className="quantity-stock">{productQuantity} Disponible</p>
        </div>
        <h2 className="price-container">
          <div>
            <ProductPrice price={price} offerPrice={offerPrice} />
          </div>
        </h2>
      </div>
    </Container>
  )
}
