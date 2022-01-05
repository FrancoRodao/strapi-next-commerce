module.exports = async (ctx, next) => {
  const { products, total, delivered, paymentInfo } = ctx.request.body

  if (!products || !total || !delivered || !paymentInfo) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      msg: 'products, total, delivered and paymentinfo is required'
    }
    return
  }

  if (!Array.isArray(products)) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      msg: 'products must be an array'
    }
    return
  }

  if (!products.every((product) => product.quantity && product.productId)) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      msg: 'products must have a productId and quantity'
    }
    return
  }

  if (typeof delivered !== 'boolean') {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      msg: 'delivered must be a boolean'
    }
    return
  }

  const paymentsEnum =
    strapi.components['pagos.info_de_pago'].allAttributes.metodo_de_pago.enum

  console.log(
    strapi.components['pagos.info_de_pago'].allAttributes.metodo_de_pago.enum,
    'MIDDLEWARE MODELS'
  )

  if (
    !paymentInfo.method ||
    !paymentInfo.email ||
    !paymentInfo.name ||
    !paymentInfo.surname
  ) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      msg: 'paymentInfo must have a method, email, name, surname'
    }
    return
  }

  if (!paymentsEnum.includes(paymentInfo.method)) {
    ctx.response.status = 400
    ctx.response.body = {
      statusCode: 400,
      msg: `invalid payment method available methods: ${paymentsEnum}`
    }
    return
  }

  await next()
}
