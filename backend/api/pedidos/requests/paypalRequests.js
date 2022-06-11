const axios = require('axios')

module.exports = {
	getPaypalOrderDetails: (paypalOrderId) => {
		return axios
			.get(`${process.env.PAYPAL_API_URL}/v2/checkout/orders/${paypalOrderId}`, {
				auth: {
					username: process.env.PAYPAL_CLIENT_ID,
					password: process.env.PAYPAL_SECRET
				}
			})
			.then((res) => res.data)
	}
}
