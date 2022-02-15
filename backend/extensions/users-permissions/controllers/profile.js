const { parseMultipartData } = require('strapi-utils')
const cloudinary = require('cloudinary').v2

module.exports = {
  async updateProfileImage(ctx) {
    try {
      const user = ctx.state.user

      const parseMultipart = parseMultipartData(ctx)
      const image = parseMultipart.files.image

      if (!image.type.includes('image/')) {
        ctx.response.status = 400
        ctx.response.body = {
          statusCode: 400,
          msg: 'The file must be an image'
        }
        return
      }

      // 5 mb
      if (image.size > 5000000) {
        ctx.response.status = 400
        ctx.response.body = {
          statusCode: 400,
          msg: 'The image must weigh 5 mb at most'
        }
        return
      }

      // update image to cloudinary
      const updatedImage = await cloudinary.uploader.upload(image.path, {
        public_id: `PROFILE-IMAGE-${user.id}`,
        overwrite: true
      })

      // update user profile image in strapi
      await strapi
        .query('user', 'users-permissions')
        .update({ id: user.id }, { profileImageUrl: updatedImage.secure_url })

      ctx.response.status = 201
      ctx.response.body = {
        statusCode: 201,
        profileImageUrl: updatedImage.secure_url
      }
    } catch (error) {
      ctx.response.status = 500
      ctx.response.body = {
        statusCode: 500,
        msg: 'Unexpected error'
      }
    }
  }
}
