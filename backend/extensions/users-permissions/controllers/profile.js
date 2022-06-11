const { parseMultipartData } = require('strapi-utils')
const cloudinary = require('cloudinary').v2

module.exports = {
  async updateProfileImage(ctx) {
    const user = ctx.state.user

    const parseMultipart = parseMultipartData(ctx)
    const image = parseMultipart.files.image

    if (!image.type.includes('image/'))
      ctx.throw(400, 'The file must be an image')

    // 5 mb
    if (image.size > 5000000)
      ctx.throw(400, 'The image must weigh 5 mb at most')

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
  },

  async changeUserEmail(ctx) {
    try {
      const user = ctx.state.user
      const newEmail = ctx.request.body.email

      if (!newEmail) ctx.throw(400, 'El email no es valido')

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

      throw e // send error to strapi error handler
    }
  },

  async changeUserUsername(ctx) {
    try {
      const user = ctx.state.user
      const newUsername = ctx.request.body.username

      if (!newUsername) ctx.throw(400, 'El nombre de usuario no es valido')

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
          msg: 'El nombre de usuario ya esta en uso'
        }
        return
      }

      throw error // send error to strapi error handler
    }
  },

  async changeUserPassword(ctx) {
    const user = ctx.state.user
    const newPassword = ctx.request.body.password

    if (!newPassword) ctx.throw(400, 'The password is not valid')

    const hashedPassword = await strapi.plugins[
      'users-permissions'
    ].services.user.hashPassword({ password: newPassword })

    await strapi
      .query('user', 'users-permissions')
      .update({ id: user.id }, { password: hashedPassword })

    ctx.status = 200
    ctx.body = {
      statusCode: 200
    }
  }
}
