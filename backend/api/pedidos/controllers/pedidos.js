'use strict'

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const { createPaypalStrapiOrder } = require('../helpers/createStrapiOrder')
const { getPaypalOrderDetails } = require('../requests/paypalRequests')

module.exports = {
  async createPaypalStrapiOrder(ctx) {
    try {
      const userId = ctx.state.user.id
      const { orderId } = ctx.query

      if (!orderId) {
        ctx.response.status = 400
        ctx.response.body = {
          statusCode: 400,
          msg: 'Invalid order id'
        }
        return
      }

      const { payer, purchase_units } = await getPaypalOrderDetails(orderId)

      const orders = purchase_units[0].items

      const capture = purchase_units[0].payments.captures[0]
      const orderTotalPrice = capture.amount.value
      const transactionId = capture.id

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
        msg: 'Successful payment'
      }
    } catch (e) {
      if (e.strapiOrderError) {
        ctx.response.status = 500
        ctx.response.body = {
          statusCode: 500,
          msg: e.strapiOrderError
        }
        return
      }

      // no optional chaining :(
      if (
        e.response &&
        e.response.data &&
        e.response.data.name === 'RESOURCE_NOT_FOUND'
      ) {
        ctx.response.status = 400
        ctx.response.body = {
          statusCode: 400,
          msg: 'Invalid order id RESOURCE_NOT_FOUND'
        }
        return
      }

      ctx.response.status = 500
      ctx.body = {
        statusCode: 500,
        msg: 'Unexpected error'
      }
    }
  }
}
