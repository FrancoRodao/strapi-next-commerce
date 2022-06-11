const ordersToPaypalItems = (orders) =>
	orders.map((order) => ({
		name: `${order.product.titulo}`,
		description: `ID: ${order.product.id}`,
		unit_amount: {
			value: order.product.precio_oferta || order.product.precio,
			currency_code: 'USD'
		},
		quantity: order.quantity || 1
	}))

export const createPaypalOrderObject = (orders, orderTotalPrice) => ({
	intent: 'CAPTURE',
	purchase_units: [
		{
			amount: {
				currency_code: 'USD',
				value: orderTotalPrice,
				breakdown: {
					item_total: {
						value: orderTotalPrice,
						currency_code: 'USD'
					}
				}
			},
			items: ordersToPaypalItems(orders),
			shipping: {
				name: {
					full_name: 'MOBILE KING'
				},
				address: {
					address_line_1: 'RETIRO EN LOCAL',
					admin_area_2: 'CALLE RANDOM ESQUINA RANDOM',
					country_code: 'UY',
					postal_code: '3000'
				}
			}
		}
	],
	application_context: {
		shipping_preference: 'SET_PROVIDED_ADDRESS'
	}
})
