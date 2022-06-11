'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

//TODO: they have the same name, this is confusing
const {
	createPaypalStrapiOrder
} = require('../helpers/createPaypalStrapiOrder')
const { getPaypalOrderDetails } = require('../requests/paypalRequests')

module.exports = {
	// TODO: add tests
	// TODO: they have the same name, this is confusing
	async createPaypalStrapiOrder(ctx) {
		try {
			const userId = ctx.state.user.id
			const { orderId } = ctx.query

			if (!orderId) ctx.throw(400, 'Invalid order id')

			const { payer, purchase_units } = await getPaypalOrderDetails(orderId)

			const orders = purchase_units[0].items

			const capture = purchase_units[0].payments.captures[0]
			const orderTotalPrice = capture.amount.value
			const transactionId = capture.id

			//TODO: they have the same name, this is confusing
			const strapiOrder = await createPaypalStrapiOrder(
				userId,
				orders,
				orderTotalPrice,
				{
					name: payer.name.given_name,
					surname: payer.name.surname,
					email: payer.email_address
				},
				transactionId
			)

			ctx.response.status = 201
			ctx.response.body = {
				statusCode: 201,
				msg: 'Successful payment',
				strapiOrderId: strapiOrder.id
			}
		} catch (e) {
			// createPaypalStrapiOrder function generates this error
			if (e?.strapiOrderError) {
				ctx.response.status = 500
				ctx.response.body = {
					statusCode: 500,
					msg: e.strapiOrderError
				}
				return
			}

			if (e?.response?.data?.name === 'RESOURCE_NOT_FOUND') {
				ctx.response.status = 400
				ctx.response.body = {
					statusCode: 400,
					msg: 'Invalid order id RESOURCE_NOT_FOUND'
				}
				return
			}

			throw e // send error to strapi error handler
		}
	},

	async getUserOrder(ctx) {
		const userId = ctx.state.user.id
		const { orderId } = ctx.params

		const ordersQuery = await strapi.query('pedidos')
		const order = await ordersQuery.findOne({
			id: orderId,
			user: userId
		})

		if (!order) ctx.throw(404, 'Order not found')

		ctx.response.status = 200
		ctx.body = {
			statusCode: 200,
			order
		}
	},

	async getUserOrders(ctx) {
		const userId = ctx.state.user.id

		const ordersQuery = await strapi.query('pedidos')
		const ordersInfo = await ordersQuery.find({
			user: userId,
			_sort: 'created_at:DESC'
		})

		ctx.response.status = 200
		ctx.body = {
			statusCode: 200,
			orders: ordersInfo
		}
	}
}
