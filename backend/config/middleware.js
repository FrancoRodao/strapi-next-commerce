module.exports = {
	settings: {
		cors: {
			origin: [
				'http://localhost:3000',
				'http://localhost:1337',
				// PRODUCTION SERVERS
				'https://strapi-next-commerce-frontend.up.railway.app',
				'https://strapi-next-ecommerce-backend.up.railway.app'
			]
		},
		parser: {
			enabled: true,
			multipart: true,
			formidable: {
				maxFileSize: 50 * 1024 * 1024 // 50 mb
			}
		}
	}
}
