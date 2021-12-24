import { useQuery } from 'react-query'
import { ApparenceAPI } from '../api/apparence'
import { QueryKeys } from '../constants/queryKeys.constant'

export function useGetMainCarouselImages() {
  return useQuery(QueryKeys.GET_MAIN_CARROUSEL_IMAGES, () =>
    ApparenceAPI.getMainCarouselImages()
  )
}
