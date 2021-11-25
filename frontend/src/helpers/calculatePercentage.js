/**
 * @example
 *
 *  Input: calculatePercentage(100, 90)
 *  Output: 10
 *
 * @param {number} price - original price to apply discount
 * @param {number} offerPrice
 * @returns {number} discount percentage
 */

export const calculatePercentage = (price, offerPrice) =>
  Math.round((offerPrice * 100) / price) - 100
