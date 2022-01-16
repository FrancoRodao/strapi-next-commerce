import { CartAPI } from '../api/cart'

/* 
  published_at === null - the product is not published in strapi
  cartItem.producto.cantidad <= 0 - Cannot buy 0 units of a product
  cartItem.quantity > cartItem.producto.cantidad - there is not enough stock of the product
*/

/**
 * filter the products of a cart
 * @param {array} cart - an array of products
 * @param {object} [options] - controls the products that have to be filtered, if the option is true the products that meet this condition will not be passed in the returned array
 * @param {boolean} options.unpublishedProducts - filter unpublished products
 * @param {boolean} options.productsOutOfStock - products that have stock 0
 * @param {boolean} options.checkAndUpdateCartItemsStock - If there is not enough stock to cover the quantity that the user has in the cart, the maximum possible quantity is assigned
 * @param {string} [accessToken] - optional access token of the user, this parameter must be sent if it is being used from the server side
 * @returns {Promise<Array>} a new array with the products that passed the filter
 */

export async function filterCart(
  cart,
  options = {
    unpublishedProducts: true,
    productsOutOfStock: true,
    checkAndUpdateCartItemsStock: true
  },
  accessToken
) {
  const validatedCart = []
  const cartItemsQuantityUpdatesPromises = []

  cart.forEach((cartItem) => {
    if (options.productsOutOfStock && cartItem.producto.cantidad <= 0) {
      return
    }

    if (
      options.unpublishedProducts &&
      cartItem.producto.published_at === null
    ) {
      return
    }

    if (
      options.checkAndUpdateCartItemsStock &&
      cartItem.cantidad > cartItem.producto.cantidad
    ) {
      /* 
        if there is not enough stock, the maximum possible quantity
        is assigned
      */
      cartItemsQuantityUpdatesPromises.push(
        CartAPI.setCartItemQuantity(
          cartItem.id,
          cartItem.producto.cantidad,
          accessToken
        )
      )

      validatedCart.push({
        ...cartItem,
        cantidad: cartItem.producto.cantidad
      })
      return
    }

    validatedCart.push(cartItem)
  })

  if (cartItemsQuantityUpdatesPromises.length > 0) {
    await Promise.all(cartItemsQuantityUpdatesPromises)
  }

  return validatedCart
}
