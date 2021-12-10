import { useState } from 'react'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import { CartAPI } from '../../../api/cart'
import Loading from '../../Loading'

const Container = styled.article`
  padding: 30px 0px;
  border-top: 1px solid ${({ theme }) => theme.borderGreylight};

  .info {
    display: flex;
    align-items: center;
    width: 100%;
  }

  .title {
    font-size: 20px;
    width: 55%;

    display: -webkit-box;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
  }

  .quantity {
    &-container {
      width: 30%;
    }
    width: fit-content;
    display: flex;
    align-items: center;
    border: 1px solid ${({ theme }) => theme.borderGreylight};
    border-radius: 5px;

    &-btn {
      font-size: 25px;
      cursor: pointer;
      padding: 5px;
      border-color: transparent;
      background-color: #fff;
      color: ${({ theme }) => theme.blue};
      margin: 0px 5px;
    }

    &-num {
      margin: 0px 15px;
    }
  }

  .subtract {
    margin-bottom: 2px;
  }

  .price {
    font-weight: 500;
  }
`

export function CartCard({
  cartItemId,
  productId,
  title,
  price,
  cartItemQuantity
}) {
  const [quantity, setQuantity] = useState(cartItemQuantity)
  const [isLoading, setIsLoading] = useState(false)

  const sumCartItemMutation = useMutation(
    () => CartAPI.addProduct([{ productId, quantity: 1 }]),
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

  const handleSumCartItem = () => sumCartItemMutation.mutate()
  const handleSubtractCartItem = () => subtractCartItemMutation.mutate()

  return (
    <Container>
      <div className="info">
        <h1 className="title">{title}</h1>
        <div className="quantity-container">
          <div className="quantity">
            {isLoading ? (
              <Loading />
            ) : (
              <>
                <button
                  onClick={handleSubtractCartItem}
                  className="quantity-btn subtract"
                  type="button"
                >
                  -
                </button>
                <p className="quantity-num">{quantity}</p>
                <button
                  onClick={handleSumCartItem}
                  className="quantity-btn"
                  type="button"
                >
                  +
                </button>
              </>
            )}
          </div>
        </div>
        <h2 className="price">$ {price}</h2>
      </div>
    </Container>
  )
}
