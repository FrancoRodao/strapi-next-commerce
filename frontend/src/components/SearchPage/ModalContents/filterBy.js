import { useRouter } from 'next/router'
import qs from 'qs'
import { useEffect, useState } from 'react'
import styled, { useTheme } from 'styled-components'
import { useModalContext } from '../../../context/Modal/ModalContext'
import { SEARCH_QUERY_PARAMS_ENUM } from '../../../helpers/enums'
import { ChevronIcon } from '../../Icons/Chevron'

const FilterBy = styled.div`
  margin-top: 30px;

  .filter__button {
    width: 100%;
    display: flex;
    justify-content: space-between;
    border: none;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    background-color: transparent;
    padding: 20px;
  }
`

const ChevronContainer = styled.span`
  transform: ${({ opened }) => (opened ? 'rotate(-180deg)' : 'none')};
  transition: transform 0.25s;
`

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
  transform-origin: top;
  transform: ${({ opened }) => (opened ? 'scaleY(1)' : 'scaleY(0)')};
  max-height: ${({ opened }) => (opened ? '1000px' : '0px')};
  opacity: ${({ opened }) => (opened ? '1' : '0')};
  transition: transform 0.25s, max-height 0.25s, opacity 0.25s;

  .options__option {
    padding: 15px 0;
    margin-left: 20px;
    border: none;
    background-color: transparent;
    text-align: start;
  }
`

export const FILTER_FIELDS = ['caracteristicas', 'caracteristicas_adicionales']

export function ModalFilterBy({ products }) {
  // TODO: DOCUMENTATION
  const [menusOpens, setMenusOpens] = useState({})
  const { blue } = useTheme()
  const router = useRouter()
  const { toggleModal } = useModalContext()

  useEffect(() => {
    const generatedFilters = {}

    // GENERATES FILTERS BASED ON THE CHARACTERISTICS OF THE PRODUCTS
    products?.forEach((product) => {
      if (product.caracteristicas) {
        Object.entries(product.caracteristicas).forEach(([key, value]) => {
          if (key === 'id') {
            return
          }

          if (!generatedFilters[key]) {
            generatedFilters[key] = {
              opened: false,
              options: []
            }
          }

          const generatedId = Math.random()

          if (
            !generatedFilters[key].options.some((item) => item.value === value)
          ) {
            generatedFilters[key].options.push({
              id: generatedId,
              value,
              field: FILTER_FIELDS[0]
            })
          }
        })
      }

      if (product.caracteristicas_adicionales) {
        product.caracteristicas_adicionales.forEach((feature) => {
          if (!generatedFilters[feature.titulo]) {
            generatedFilters[feature.titulo] = {
              opened: false,
              options: []
            }
          }

          if (
            !generatedFilters[feature.titulo].options.some(
              (item) => item.value === feature.descripcion
            )
          ) {
            generatedFilters[feature.titulo].options.push({
              id: feature.id,
              value: feature.descripcion,
              field: FILTER_FIELDS[1]
            })
          }
        })
      }
    })

    setMenusOpens(generatedFilters)
  }, [products])

  const handleSetFilter = (key, filter) => {
    const currentPath = router.asPath
    const urlQueryParams = currentPath.split('?')[1]
    const queryParamsSplitted = urlQueryParams.split('&')

    const currentPage =
      currentPath.split(`&${SEARCH_QUERY_PARAMS_ENUM.page}=`)[1]?.charAt(0) || 0

    let filtersOnCurrentPath = qs.parse(
      queryParamsSplitted.find((param) =>
        param.includes(SEARCH_QUERY_PARAMS_ENUM.filters)
      )
    )

    if (Object.keys(filtersOnCurrentPath).length) {
      if (filter.field === FILTER_FIELDS[0]) {
        filtersOnCurrentPath = {
          filters: {
            ...filtersOnCurrentPath.filters,
            [FILTER_FIELDS[0]]: {
              ...filtersOnCurrentPath.filters[FILTER_FIELDS[0]],
              [key]: filter.value
            }
          }
        }
      }

      if (filter.field === FILTER_FIELDS[1]) {
        filtersOnCurrentPath = {
          filters: {
            ...filtersOnCurrentPath.filters,
            [FILTER_FIELDS[1]]: {
              ...filtersOnCurrentPath.filters[FILTER_FIELDS[1]],
              [key]: filter.value
            }
          }
        }
      }
    } else {
      filtersOnCurrentPath = {
        filters: {
          [filter.field]: {
            [key]: filter.value
          }
        }
      }
    }

    const queryParamsWithoutFilterAndPage = queryParamsSplitted
      .filter((param) => {
        if (param.includes(SEARCH_QUERY_PARAMS_ENUM.filters)) {
          return false
        }

        if (param === `${SEARCH_QUERY_PARAMS_ENUM.page}=${currentPage}`) {
          return false
        }

        return true
      })
      .join('&')

    const filters = qs.stringify(filtersOnCurrentPath)

    router.push(`/search?${queryParamsWithoutFilterAndPage}&${filters}`)

    toggleModal()
  }

  return (
    <FilterBy>
      <div>
        {Object.keys(menusOpens).length ? (
          Object.keys(menusOpens).map((key) => (
            <div key={key}>
              <button
                type="button"
                onClick={() =>
                  setMenusOpens({
                    ...menusOpens,
                    [key]: {
                      ...menusOpens[key],
                      opened: !menusOpens[key].opened
                    }
                  })
                }
                className="filter__button"
              >
                {key.replace('_', ' ')}
                <ChevronContainer opened={menusOpens[key].opened}>
                  <ChevronIcon color={blue} />
                </ChevronContainer>
              </button>
              <OptionsContainer opened={menusOpens[key].opened}>
                {menusOpens[key].options.map((option) => (
                  <button
                    key={option.id}
                    onClick={() => handleSetFilter(key, option)}
                    className="options__option"
                    type="button"
                  >
                    {option.value}
                  </button>
                ))}
              </OptionsContainer>
            </div>
          ))
        ) : (
          <p style={{ fontSize: '20px' }}>No hay filtros para mostrar...</p>
        )}
      </div>
    </FilterBy>
  )
}
