module.exports = {
  checkout() {
    console.log('paso por checkout')
  },

  getBrainTreeClientToken(ctx) {
    return strapi.services.BraintreeGateway.clientToken
      .generate({})
      .then((response) => {
        return ctx.send(response)
      })
  }
}
