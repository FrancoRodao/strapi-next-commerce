module.exports = {
	settings: {
		cors: {
			origin: [
				'http://localhost:3000',
				'http://localhost:1337',
				// PRODUCTION SERVERS
				'https://strapi-next-commerce-frontend.up.railway.app',
				'https://strapi-next-ecommerce-backend.up.railway.app',
				'https://strapi-next-commerce.vercel.app',
				"https://strapi-next-commerce.onrender.com"
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
