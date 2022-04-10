import qs from 'qs'
import { SORT_PRODUCTS_ENUM } from '../helpers/enums'
import { instance } from './instance'

// publicationState=live -> only published products

function getBestSellers() {
  // DESC = descendant
  return instance
    .get('/productos?_sort=vendidos:DESC&_limit=4&_publicationState=live')
    .then((res) => res.data)
}

function getOfferProducts() {
  // GT = greater than
  return instance
    .get('/productos?precio_oferta_gt=0&_limit=4&_publicationState=live')
    .then((res) => res.data)
}

function getProduct(id) {
  return instance.get(`/productos/${id}`).then((res) => res.data)
}

function getSearchProducts(searchTerm = null, filters = null, sort = null) {
  const queryString = qs.stringify({
    _where: {
      _or: [
        [{ titulo_contains: searchTerm }],
        [{ descripcion_contains: searchTerm }]
      ]
    },
    filters: qs.parse(filters) || null,
    sort: sort || SORT_PRODUCTS_ENUM.most_relevant
  })

  return instance
    .get(`/productos?_publicationState=live&${queryString}`)
    .then((res) => res.data)
}

export const ProductsAPI = {
  getBestSellers,
  getOfferProducts,
  getProduct,
  getSearchProducts
}
