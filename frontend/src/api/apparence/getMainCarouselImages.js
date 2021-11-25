export function getMainCarouselImages() {
  return fetch('http://localhost:1337/imagenes-carousel-principal').then(
    (res) => res.json()
  )
}
