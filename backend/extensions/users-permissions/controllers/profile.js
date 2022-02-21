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
  },

  async changeUserEmail(ctx) {
    try {
      const user = ctx.state.user
      const newEmail = ctx.request.body.email

      if (!newEmail) {
        ctx.status = 400
        ctx.body = {
          statusCode: 400,
          msg: 'El email no es valido'
        }
        return
      }

      await strapi
        .query('user', 'users-permissions')
        .update({ id: user.id }, { email: newEmail })

      ctx.status = 200
      ctx.body = {
        statusCode: 200,
        newEmail
      }
    } catch (error) {
      if (error.message === 'Duplicate entry') {
        ctx.status = 400
        ctx.body = {
          statusCode: 400,
          msg: 'El email ya esta en uso'
        }
        return
      }

      ctx.status = 500
      ctx.body = {
        statusCode: 500,
        msg: 'Unexpected error'
      }
    }
  },

  async changeUserUsername(ctx) {
    try {
      const user = ctx.state.user
      const newUsername = ctx.request.body.username

      if (!newUsername) {
        ctx.status = 400
        ctx.body = {
          statusCode: 400,
          msg: 'The username is not valid'
        }
        return
      }

      await strapi
        .query('user', 'users-permissions')
        .update({ id: user.id }, { username: newUsername })

      ctx.status = 200
      ctx.body = {
        statusCode: 200,
        newUsername
      }
    } catch (error) {
      if (error.message === 'Duplicate entry') {
        ctx.status = 400
        ctx.body = {
          statusCode: 400,
          msg: 'El usuario ya esta en uso'
        }
        return
      }

      ctx.status = 500
      ctx.body = {
        statusCode: 500,
        msg: 'Unexpected error'
      }
    }
  },

  async changeUserPassword(ctx) {
    try {
      const user = ctx.state.user
      const newPassword = ctx.request.body.password

      if (!newPassword) {
        ctx.status = 400
        ctx.body = {
          statusCode: 400,
          msg: 'The password is not valid'
        }
        return
      }

      await strapi
        .query('user', 'users-permissions')
        .update({ id: user.id }, { password: newPassword })

      ctx.status = 200
      ctx.body = {
        statusCode: 200
      }
    } catch (error) {
      ctx.status = 500
      ctx.body = {
        statusCode: 500,
        msg: 'Unexpected error'
      }
    }
  }
}
