import { instance } from './instance'

/**
 * @param {string} accessToken - the access token is useful for making requests from the server side
 */
function getCart(accessToken) {
  let config
  if (accessToken) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }
  return instance.get('/users/me/cart', config).then((res) => res.data)
}

function addProduct(products) {
  return instance.post('/users/me/cart', products).then((res) => res.data)
}

function subtractOne(cartItemId) {
  return instance
    .delete(`/users/me/cart/subtractOne/${cartItemId}`)
    .then((res) => res.data)
}

export const CartAPI = {
  getCart,
  addProduct,
  subtractOne
}
