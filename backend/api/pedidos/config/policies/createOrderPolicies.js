const Joi = require('joi')

module.exports = async (ctx, next) => {
  const body = ctx.request.body

  const paymentsEnum =
    strapi.components['pagos.info_de_pago'].allAttributes.metodo_de_pago.enum

  const schema = Joi.object({
    products: Joi.array()
      .min(1)
      .items(
        Joi.object({
          productId: Joi.number(),
          quantity: Joi.number().positive().integer()
        })
      ),
    delivered: Joi.boolean(),
    paymentInfo: Joi.object({
      method: Joi.string().valid(...paymentsEnum),
      email: Joi.string().email({
        tlds: false
      }),
      name: Joi.string(),
      surname: Joi.string()
    })
  }).validate(body, {
    presence: 'required'
  })

  if (schema.error) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      error: 'Bad request',
      message: schema.error.message
    }
    return
  }

  await next()
}
