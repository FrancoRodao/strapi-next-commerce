export function getBestSellers() {
  // DESC = descendant
  return fetch(
    'http://localhost:1337/productos?_sort=vendidos:DESC&_limit=4'
  ).then((res) => res.json())
}

export function getOfferProducts() {
  // GT = greater than
  return fetch(
    'http://localhost:1337/productos?precio_oferta_gt=0&_limit=4'
  ).then((res) => res.json())
}

export function getProducts() {
  return fetch('http://localhost:1337/productos').then((res) => res.json())
}

export function getProduct(id) {
  return fetch(`http://localhost:1337/productos/${id}`).then((res) =>
    res.json()
  )
}
