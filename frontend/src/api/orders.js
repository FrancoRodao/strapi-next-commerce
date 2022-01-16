import { instance } from './instance'

const createPaypalStrapiOrder = ({ orderId }) =>
  instance
    .post(`/orders/paypal/create?orderId=${orderId}`)
    .then((res) => res.data)

export const OrdersAPI = {
  createPaypalStrapiOrder
}
