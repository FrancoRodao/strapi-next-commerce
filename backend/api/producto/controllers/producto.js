'use strict'
const { sanitizeEntity } = require('strapi-utils')

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/development/backend-customization.html#core-controllers)
 * to customize this controller
 */

const SORT_ENUM = {
  most_relevant: 'MOST_RELEVANT',
  lower_price: 'LOWER_PRICE',
  higher_price: 'HIGHER_PRICE'
}

module.exports = {
  async find(ctx) {
    //TODO: DOCUMENTATION
    let products

    const { _q: strapiSearchQuery, filters, sort, ...restQuery } = ctx.query

    if (strapiSearchQuery) {
      products = await strapi.services.producto.search({
        _q: strapiSearchQuery
      })
    }

    if (filters) {
      products = await strapi.query('producto').find(restQuery)

      if (filters.caracteristicas) {
        const typeOneFiltersEntries = Object.entries(filters.caracteristicas)

        products = products.filter((entity) => {
          for (const [key, value] of typeOneFiltersEntries) {
            if (
              entity.caracteristicas[key] &&
              entity.caracteristicas[key] == value
            ) {
              continue
            }

            return false
          }

          return true
        })
      }

      if (filters.caracteristicas_adicionales) {
        const typeTwoFiltersEntries = Object.entries(
          filters.caracteristicas_adicionales
        )

        products = products.filter((entity) => {
          for (const caracteristica of entity.caracteristicas_adicionales) {
            for (const [key, value] of typeTwoFiltersEntries) {
              if (
                caracteristica.titulo === key &&
                caracteristica.descripcion === value
              ) {
                continue
              }

              return false
            }

            return true
          }
        })
      }
    }

    if (!filters && !strapiSearchQuery) {
      products = await strapi.query('producto').find(restQuery)
    }

    if (sort) {
      if (sort === SORT_ENUM.lower_price) {
        products = products.sort(
          (p1, p2) =>
            (p1.precio_oferta || p1.precio) - (p2.precio_oferta || p2.precio)
        )
      }

      if (sort === SORT_ENUM.higher_price) {
        products = products.sort(
          (p1, p2) =>
            (p2.precio_oferta || p2.precio) - (p1.precio_oferta || p1.precio)
        )
      }

      if (sort === SORT_ENUM.most_relevant) {
        products = products.sort((p1, p2) => p2.vendidos - p1.vendidos)
      }
    }

    return products.map((product) =>
      sanitizeEntity(product, { model: strapi.models.producto })
    )
  }
}
