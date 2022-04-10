import { useRouter } from 'next/router'
import { useState } from 'react'
import styled from 'styled-components'
import { useModalContext } from '../../../context/Modal/ModalContext'
import {
  SEARCH_QUERY_PARAMS_ENUM,
  SORT_PRODUCTS_ENUM
} from '../../../helpers/enums'

const Container = styled.div`
  margin-top: 30px;

  .selected {
    border-left: 0.1111111111em solid #3483fa;
    border-left-width: 6px;
  }
`

const Paragraph = styled.p`
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 15px;
`

export function ModalSortBy() {
  const router = useRouter()

  const currentPath = router.asPath
  const urlQueryParams = currentPath.split('?')[1]
  const queryParamsSplitted = urlQueryParams.split('&')

  const currentSort =
    queryParamsSplitted
      .find((param) => param.includes(SEARCH_QUERY_PARAMS_ENUM.sort))
      ?.split('=')[1] || SORT_PRODUCTS_ENUM.most_relevant

  const [selected, setSelected] = useState(currentSort)
  const { toggleModal } = useModalContext()

  const handleOnClick = (sort) => () => {
    setSelected(sort)

    const currentPage =
      currentPath.split(`&${SEARCH_QUERY_PARAMS_ENUM.page}=`)[1]?.charAt(0) || 0

    const queryParamsWithoutSortAndPage = queryParamsSplitted
      .filter((param) => {
        if (param === `${SEARCH_QUERY_PARAMS_ENUM.sort}=${currentSort}`) {
          return false
        }

        if (param === `${SEARCH_QUERY_PARAMS_ENUM.page}=${currentPage}`) {
          return false
        }

        return true
      })
      .join('&')

    router.push(`/search?${queryParamsWithoutSortAndPage}&sort=${sort}&page=0`)

    toggleModal()
  }

  return (
    <Container>
      <Paragraph
        onClick={handleOnClick(SORT_PRODUCTS_ENUM.most_relevant)}
        className={`${
          selected === SORT_PRODUCTS_ENUM.most_relevant ? 'selected' : ''
        }`}
      >
        Mas relevantes
      </Paragraph>
      <Paragraph
        onClick={handleOnClick(SORT_PRODUCTS_ENUM.lower_price)}
        className={`${
          selected === SORT_PRODUCTS_ENUM.lower_price ? 'selected' : ''
        }`}
      >
        Menor precio
      </Paragraph>
      <Paragraph
        onClick={handleOnClick(SORT_PRODUCTS_ENUM.higher_price)}
        className={`${
          selected === SORT_PRODUCTS_ENUM.higher_price ? 'selected' : ''
        }`}
      >
        Mayor precio
      </Paragraph>
    </Container>
  )
}
