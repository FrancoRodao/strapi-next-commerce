import { instance } from './instance'

function getBestSellers() {
  // DESC = descendant
  return instance('/productos?_sort=vendidos:DESC&_limit=4').then(
    (res) => res.data
  )
}

function getOfferProducts() {
  // GT = greater than
  return instance('/productos?precio_oferta_gt=0&_limit=4').then(
    (res) => res.data
  )
}

function getProducts() {
  return instance('/productos').then((res) => res.data)
}

function getProduct(id) {
  return instance(`/productos/${id}`).then((res) => res.data)
}

export const ProductsAPI = {
  getBestSellers,
  getOfferProducts,
  getProducts,
  getProduct
}
