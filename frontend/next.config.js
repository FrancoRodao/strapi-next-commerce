/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      'res.cloudinary.com',
      'https://strapi-next-ecommerce-backend.up.railway.app'
    ]
  }
}
