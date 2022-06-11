import { useQuery } from 'react-query'
import { AppearanceAPI } from '../api/appearance'
import { QueryKeys } from '../constants/queryKeys.constant'

export function useGetMainCarouselImages() {
	return useQuery(
		QueryKeys.GET_MAIN_CARROUSEL_IMAGES,
		() => AppearanceAPI.getMainCarouselImages(),
		{
			staleTime: Infinity
		}
	)
}
