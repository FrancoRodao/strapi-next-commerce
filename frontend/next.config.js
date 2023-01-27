/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      // PRODUCTION BACKENDS ORIGINS
      'https://strapi-next-ecommerce-backend.up.railway.app',
      'https://strapi-next-commerce.onrender.com'
    ]
  }
}
