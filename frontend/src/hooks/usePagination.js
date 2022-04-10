import { useRouter } from 'next/router'
import { SEARCH_QUERY_PARAMS_ENUM } from '../helpers/enums'

// TODO: Pagination should come from the backend

export function usePagination({
  data,
  searchTerm,
  startInPage,
  MAX_PAGINATION_RESULTS
}) {
  const router = useRouter()

  const paginatedData = data?.slice(
    startInPage * MAX_PAGINATION_RESULTS,
    MAX_PAGINATION_RESULTS * (Number(startInPage) + 1)
  )

  const currentPath = router.asPath
  const currentPage =
    currentPath.split(`&${SEARCH_QUERY_PARAMS_ENUM.page}=`)[1]?.charAt(0) || 0

  const urlQueryParams = currentPath.split('?')[1]

  const queryParamsSplitted = urlQueryParams.split('&')
  const queryParamsWithoutPage = queryParamsSplitted
    .filter(
      (param) => param !== `${SEARCH_QUERY_PARAMS_ENUM.page}=${currentPage}`
    )
    .join('&')

  const handleNextPage = () =>
    router.push(
      `/search?${queryParamsWithoutPage}&page=${Number(startInPage) + 1}`
    )

  const handlePrevPage = () => {
    if (startInPage > 0) {
      router.push(
        `/search?${queryParamsWithoutPage}&page=${Number(startInPage) - 1}`
      )
    }
  }

  const shouldPaginate = data?.length > MAX_PAGINATION_RESULTS
  const totalPages = Math.ceil(data?.length / MAX_PAGINATION_RESULTS)

  const isTherePrevPage = startInPage > 0
  const isThereNextPage =
    data?.slice(
      (Number(startInPage) + 1) * MAX_PAGINATION_RESULTS,
      MAX_PAGINATION_RESULTS * (Number(startInPage) + 1 + 1)
    ).length > 0

  return {
    paginatedData,
    handleNextPage,
    handlePrevPage,
    shouldPaginate,
    totalPages,
    isThereNextPage,
    isTherePrevPage
  }
}
