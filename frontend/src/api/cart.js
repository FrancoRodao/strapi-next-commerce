import { axiosConfigWithToken } from '../helpers/axiosConfigWithToken'
import { instance } from './instance'

/**
 * @param {string} accessToken - the access token is useful for making requests from the server side
 */
function getCart(accessToken) {
  const config = axiosConfigWithToken(accessToken)

  return instance.get('/users/me/cart', config).then((res) => res.data)
}

function addCartItem(products) {
  return instance.post('/users/me/cart', products).then((res) => res.data)
}

function subtractOne(cartItemId) {
  return instance
    .delete(`/users/me/cart/subtractOne/${cartItemId}`)
    .then((res) => res.data)
}

function deleteCartItem(cartItemId) {
  return instance.delete(`/users/me/cart/${cartItemId}`).then((res) => res.data)
}

/**
 * @param {string} accessToken - the access token is useful for making requests from the server side
 */
function setCartItemQuantity(cartItemId, newCartItemQuantity, accessToken) {
  const config = axiosConfigWithToken(accessToken)

  return instance
    .post(
      `/users/me/cart/setCartItemQuantity`,
      {
        cartItemId,
        newCartItemQuantity
      },
      config
    )
    .then((res) => res.data)
}

/**
 * @param {string} accessToken - the access token is useful for making requests from the server side
 */
function clearCart(accessToken) {
  const config = axiosConfigWithToken(accessToken)

  return instance.delete(`/users/me/cart`, config).then((res) => res.data)
}

export const CartAPI = {
  getCart,
  addCartItem,
  subtractOne,
  setCartItemQuantity,
  deleteCartItem,
  clearCart
}
