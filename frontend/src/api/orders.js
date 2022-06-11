import { axiosConfigWithToken } from '../helpers/axiosConfigWithToken'
import { instance } from './instance'

const createPaypalStrapiOrder = ({ orderId }) =>
	instance
		.post(`/orders/paypal/create?orderId=${orderId}`)
		.then((res) => res.data)

const getUserOrder = (orderId, accessToken) => {
	const config = axiosConfigWithToken(accessToken)

	return instance.get(`/order/${orderId}`, config).then((res) => res.data.order)
}

const getUserOrders = (accessToken) => {
	const config = axiosConfigWithToken(accessToken)

	return instance.get(`/orders/me`, config).then((res) => res.data.orders)
}

export const OrdersAPI = {
	createPaypalStrapiOrder,
	getUserOrder,
	getUserOrders
}
