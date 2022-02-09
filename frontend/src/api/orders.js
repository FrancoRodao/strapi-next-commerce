import { instance } from './instance'

const createPaypalStrapiOrder = ({ orderId }) =>
  instance
    .post(`/orders/paypal/create?orderId=${orderId}`)
    .then((res) => res.data)

const getUserOrder = (orderId, accessToken) => {
  let config
  if (accessToken) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  return instance.get(`/order/${orderId}`, config).then((res) => res.data.order)
}

const getUserOrders = (accessToken) => {
  let config
  if (accessToken) {
    config = {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  }

  return instance.get(`/orders/me`, config).then((res) => res.data.orders)
}

export const OrdersAPI = {
  createPaypalStrapiOrder,
  getUserOrder,
  getUserOrders
}
