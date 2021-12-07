import { instance } from './instance'

function getUserCart() {
  return instance.get('/users/me/cart')
}

export { getUserCart }
