/**
 * @returns {boolean} returns true if the product meets the validations, otherwise returns false
 */
export function checkoutProductValidations(product, quantityToBuy) {
	/* 
    VALIDATIONS:
    published_at === null - the product is not published in strapi
    product.cantidad <= 0  - Cannot buy 0 units of a product
    quantityToBuy > product.cantidad - there is not enough stock of the product
  */

	if (
		product.published_at === null ||
		product.cantidad <= 0 ||
		quantityToBuy > product.cantidad
	) {
		return false
	}

	return true
}
