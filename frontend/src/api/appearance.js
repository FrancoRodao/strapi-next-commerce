import { instance } from './instance'

function getMainCarouselImages() {
  return instance('/carousel-principals').then((res) => res.data)
}

export const AppearanceAPI = {
  getMainCarouselImages
}
