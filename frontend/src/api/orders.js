import { instance } from './instance'

const createOrder = ({ products, total, delivered, paymentInfo }) =>
  instance
    .post('/orders', {
      products,
      total,
      delivered,
      paymentInfo
    })
    .then((res) => res.data)

export const OrdersAPI = {
  createOrder
}
