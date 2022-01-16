import styled from 'styled-components'
import Image from 'next/image'
import Link from 'next/link'
import toast from 'react-hot-toast'
import Loading from '../../Loading'
import { ProductPrice } from '../../ProductPrice'
import {
  useAddCartItem,
  useDeleteCartItem,
  useRemoveOneToCartItem
} from '../../../hooks/cartHook'
import { ErrorMessage } from '../../ErrorMessage'

const Container = styled.article`
  padding: 30px 0px;
  border-bottom: 1px solid ${({ theme }) => theme.gray};
  background-color: ${({ invalidateProduct }) =>
    invalidateProduct && 'rgba(0, 0, 0, 0.1)'};
  position: relative;

  .invalidProduct {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
  }

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
  productQuantity,
  productPublishedAt
}) {
  const { addCartItem, isLoading: addCartItemLoading } = useAddCartItem(
    productId,
    1
  )

  const { removeOneToCartItem, isLoading: removeOneToCartItemLoading } =
    useRemoveOneToCartItem(cartItemId)

  const { deleteCartItem, isLoading: deleteCartItemLoading } =
    useDeleteCartItem(cartItemId, {
      onSuccess: () =>
        toast('Producto eliminado', {
          icon: <i style={{ color: '#17a2b8' }} className="bx bx-info-circle" />
        })
    })

  const isLoading =
    addCartItemLoading || removeOneToCartItemLoading || deleteCartItemLoading

  const unPublishedProduct = productPublishedAt === null || productQuantity <= 0

  return (
    <Container invalidateProduct={unPublishedProduct}>
      {unPublishedProduct && (
        <span className="invalidProduct">
          <ErrorMessage>
            Este producto no está disponible por el momento
          </ErrorMessage>
        </span>
      )}
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
          <Link href={`/product/${productId}`}>
            <a href={`/product/${productId}`}>
              <h1 className="title">{title}</h1>
            </a>
          </Link>
          <div className="btn-container">
            <button
              onClick={deleteCartItem}
              type="button"
              className="btn btn--delete"
            >
              Eliminar
            </button>
          </div>
        </div>
        <div className="quantity-container">
          <div className={`quantity ${isLoading ? 'quantity--disabled' : ''}`}>
            <button
              onClick={removeOneToCartItem}
              className={`quantity-btn quantity-btn-subtract subtract ${
                cartItemQuantity === 1 ? 'btn-disabled' : ''
              }`}
              type="button"
              disabled={
                unPublishedProduct || isLoading || cartItemQuantity === 1
              }
            >
              -
            </button>
            <p className="quantity-num">{cartItemQuantity}</p>
            <button
              onClick={addCartItem}
              className={`quantity-btn ${
                cartItemQuantity === productQuantity ? 'btn-disabled' : ''
              }`}
              type="button"
              disabled={
                unPublishedProduct ||
                isLoading ||
                cartItemQuantity === productQuantity
              }
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
