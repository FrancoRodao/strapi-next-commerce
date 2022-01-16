import { instance } from './instance'

function getMainCarouselImages() {
  return instance('/imagenes-carousel-principal').then((res) => res.data)
}

export const AppearanceAPI = {
  getMainCarouselImages
}
