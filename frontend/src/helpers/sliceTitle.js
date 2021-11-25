/**
 * @example
 *
 *  Input: "largooooooooooooooooooooooooooo"
 *  Output: "largooooooooo..."
 *
 * @param {string} title - title or string to slice
 * @param {number} maxCharactersTitle - maximum number of characters that the title or string must have
 */

export function sliceTitle(title, maxCharactersTitle = 93) {
  if (title.length >= maxCharactersTitle) {
    const TitleSliced = title.slice(0, maxCharactersTitle - 3)
    return TitleSliced.concat('...')
  }

  return title
}
