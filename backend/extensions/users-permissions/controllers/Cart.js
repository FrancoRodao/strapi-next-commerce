const addToCartMiddleware = require('../middlewares/Cart/addToCart.middleware')

module.exports = {
  async getCart(ctx) {
    const userId = ctx.state.user.id

    const userInfo = await strapi
      .query('user', 'users-permissions')
      .findOne({ id: userId })

    return ctx.send(userInfo.carrito)
  },

  async clearCart(ctx) {
    const userId = ctx.state.user.id

    const userInfo = await strapi
      .query('user', 'users-permissions')
      .update({ id: userId }, { carrito: [] })

    ctx.send(userInfo.carrito)
  },

  async removeItem(ctx) {
    const userId = ctx.state.user.id
    const { cartItemId } = ctx.params

    if (!Number(cartItemId)) {
      ctx.response.status = 400
      return ctx.send({
        statusCode: 400,
        error: 'Bad request',
        message: 'Error: Cart item id must be an number'
      })
    }

    const query = await strapi.query('user', 'users-permissions')
    const userInfo = await query.findOne({
      id: userId
    })

    const updatedCart = userInfo.carrito.filter(
      (item) => item.id !== Number(cartItemId)
    )

    const userUpdated = await query.update(
      {
        id: userId
      },
      {
        carrito: updatedCart
      }
    )

    return ctx.send(userUpdated)
  },

  async addToCart(ctx) {
    //TODO: TRY TO IMPROVE IT
    const userId = ctx.state.user.id
    const cartItems = ctx.request.body

    /*extract cart items from body*/
    let newItems = cartItems.map((cartItem) => ({
      __component: 'custom.productos',
      producto: { id: cartItem.productId },
      cantidad: cartItem.quantity
    }))

    const newItemsProductsIds = newItems.map((item) => item.producto.id)

    /* VALIDATIONS */
    const error = await addToCartMiddleware(ctx, cartItems, newItemsProductsIds)
    if (error) return ctx.send(error)
    /* VALIDATIONS */

    const query = await strapi.query('user', 'users-permissions')
    const userInfo = await query.findOne({ id: userId })
    let itemsRepeated = []

    userInfo.carrito.forEach((item, index) => {
      // the product already exists in the user's cart
      if (newItemsProductsIds.includes(item.producto.id)) {
        const element = userInfo.carrito[index]
        const productIdIndex = newItemsProductsIds.indexOf(item.producto.id)
        // we add the amounts
        // DO NOT add a new item to the cart, as they are the same
        element.cantidad += newItems[productIdIndex].cantidad

        // We remove the new product as the quantity
        // of the new product has been added to that of the product
        // that was in the cart.
        itemsRepeated.push(index)
      }
    })

    itemsRepeated.forEach((index) => (newItems = newItems.slice(index, index)))

    const userUpdated = await query.update(
      {
        id: userId
      },
      {
        carrito: [...userInfo.carrito, ...newItems]
      }
    )

    return ctx.send(userUpdated.carrito)
  },

  async subtractOne(ctx) {
    const userId = ctx.state.user.id

    const { cartItemId } = ctx.params
    if (!cartItemId) {
      ctx.response.status = 400
      return ctx.send({
        statusCode: 400,
        error: 'Bad request',
        message: 'Error: Cart item id must be an number'
      })
    }

    const query = await strapi.query('user', 'users-permissions')
    const userInfo = await query.findOne({
      id: userId
    })

    const cartUpdated = userInfo.carrito.map((item) => {
      if (item.id === Number(cartItemId)) {
        item.cantidad -= 1
      }
      return item
    })

    const userUpdated = await query.update(
      {
        id: userId
      },
      {
        carrito: cartUpdated
      }
    )

    return ctx.send(userUpdated.carrito)
  }
}
