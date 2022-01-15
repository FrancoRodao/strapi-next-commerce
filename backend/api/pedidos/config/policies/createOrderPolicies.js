module.exports = async (ctx, next) => {
  const body = ctx.request.body
  const { products, total, delivered, paymentInfo } = body

  console.log(body)

  if (
    !body.hasOwnProperty('products') ||
    !body.hasOwnProperty('total') ||
    !body.hasOwnProperty('delivered') ||
    !body.hasOwnProperty('paymentInfo')
  ) {
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

  if (
    !products.every(
      (product) => product.quantity && product.hasOwnProperty('productId')
    )
  ) {
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

  //TODO: ADD VALDATION PAYMENTINFO PROPS MUST BE A STRING
  if (
    !paymentInfo.hasOwnProperty('method') ||
    !paymentInfo.hasOwnProperty('email') ||
    !paymentInfo.hasOwnProperty('name') ||
    !paymentInfo.hasOwnProperty('surname')
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
