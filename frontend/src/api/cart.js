import { instance } from './instance'

function addProduct(products) {
  return instance.post('/users/me/cart', products)
}

function subtractOne(cartItemId) {
  return instance.delete(`/users/me/cart/subtractOne/${cartItemId}`)
}

export const CartAPI = {
  addProduct,
  subtractOne
}
