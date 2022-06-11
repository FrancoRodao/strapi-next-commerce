import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
import qs from 'qs'
import { useRouter } from 'next/router'
import { ProductsAPI } from '../api/products'
import { Button } from '../components/Button'
import { PhoneCards } from '../components/Cards/PhoneCard/PhoneCards'
import { FilterIcon } from '../components/Icons/Filter'
import { SortIcon } from '../components/Icons/Sort'
import { QueryKeys } from '../constants/queryKeys.constant'
import { useGetSearchProducts } from '../hooks/productHook'
import {
	ModalContextProvider,
	useModalContext
} from '../context/Modal/ModalContext'
import { Modal } from '../components/Modal'
import {
	FILTER_FIELDS,
	ModalFilterBy
} from '../components/SearchPage/ModalContents/filterBy'
import { usePagination } from '../hooks/usePagination'
import { ModalSortBy } from '../components/SearchPage/ModalContents/sortBy'
import Loading from '../components/Loading'
import { SEARCH_QUERY_PARAMS_ENUM } from '../helpers/enums'
import { CloseIcon } from '../components/Icons/Close'

const OptionsContainer = styled.div`
	width: 100%;
	position: relative;
	display: flex;
	align-items: center;
	justify-content: space-around;
	background-color: #fff;
	border: 1px solid rgba(0, 0, 0, 0.07);

	&::before {
		content: '';
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		width: 20px;
		height: 20px;
		border-right: 1px solid #ddd;
	}

	.options {
		&__option {
			width: 100%;
			padding: 15px;
			text-align: center;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 3px;
			cursor: pointer;
			border: none;
			background-color: transparent;
		}

		&__optionParagraph {
			display: inline;
			color: ${({ theme }) => theme.blue};
		}
	}
`

const TitleContainer = styled.div`
	padding: 0 20px;
	margin: 20px 0px;
`

const FilterSpan = styled.span`
	display: inline-flex;
	align-items: center;
	margin: 15px 10px 15px 0px;
	padding: 10px;
	border-radius: 10px;
	background-color: rgba(0, 0, 0, 0.06);

	.filter__close {
		margin-left: 7px;
		cursor: pointer;
		border: none;
		background-color: transparent;
	}
`

const ItemsContainer = styled.div`
	width: 100%;
	display: flex;
	gap: 12px;
	flex-wrap: wrap;
	margin-bottom: 40px;
`

const PaginationContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	margin-top: 20px;

	.pagination__button {
		margin: 0 15px;
	}

	.pagination__paragraph {
		text-align: center;
		width: 100%;
	}
`

const NoResultsContainer = styled.div`
	display: flex;
	justify-content: center;
	width: 100%;
`

// TODO: REFACTOR PAGE, FILTERBY AND SORTBY
function Page({ searchTerm, page, filters, sort }) {
	const { data: products, isLoading } = useGetSearchProducts(
		searchTerm,
		page,
		filters,
		sort
	)

	// TODO: Pagination should come from the backend
	const {
		paginatedData,
		handleNextPage,
		handlePrevPage,
		isThereNextPage,
		isTherePrevPage,
		shouldPaginate,
		totalPages
	} = usePagination({
		data: products,
		searchTerm,
		startInPage: page,
		MAX_PAGINATION_RESULTS: 6
	})

	const { toggleModal, modalInfo, setModalInfo } = useModalContext()
	const router = useRouter()

	// column 1 even - column 2 odd
	const productsInEvenIndex = paginatedData?.filter(
		(_, index) => index % 2 === 0
	)
	const productsInOddIndex = paginatedData?.filter((_, index) => index % 2 !== 0)

	const handleSort = () => {
		setModalInfo({
			title: 'Ordenar por',
			content: <ModalSortBy />
		})

		toggleModal()
	}

	const handleFilter = () => {
		setModalInfo({
			title: 'Filtrar por',
			content: <ModalFilterBy products={products} />
		})

		toggleModal()
	}

	function LoadingOrItems() {
		if (isLoading) {
			return <Loading />
		}

		return paginatedData?.length > 0 ? (
			<>
				<PhoneCards
					queryData={{ data: productsInEvenIndex }}
					placeHoldersCards={1}
				/>
				<PhoneCards
					queryData={{ data: productsInOddIndex }}
					placeHoldersCards={1}
				/>
			</>
		) : (
			<NoResultsContainer>
				<h1>No se encontraron resultados :(</h1>
			</NoResultsContainer>
		)
	}

	const currentPath = router.asPath
	const urlQueryParams = currentPath.split('?')[1]
	const queryParamsSplitted = urlQueryParams.split('&')

	const currentFilters =
		queryParamsSplitted
			.filter((param) => param.includes(SEARCH_QUERY_PARAMS_ENUM.filters))
			.join('&') || {}

	const filtersParsed = qs.parse(currentFilters) || {}
	const filtersUI = []

	FILTER_FIELDS.forEach((field) => {
		if (filtersParsed?.filters && filtersParsed.filters[field]) {
			Object.entries(filtersParsed.filters[field]).forEach(([key, value]) =>
				filtersUI.push({
					key,
					value,
					field
				})
			)
		}
	})

	const handleRemoveFilter = (filterObject) => () => {
		const { key, field } = filterObject
		delete filtersParsed.filters[field][key]

		const queryParamsWithoutFilter = queryParamsSplitted
			.filter((param) => !param.includes(SEARCH_QUERY_PARAMS_ENUM.filters))
			.join('&')

		const newFilters = qs.stringify(filtersParsed)

		if (newFilters) {
			router.push(
				`/search?${queryParamsWithoutFilter}&${qs.stringify(filtersParsed)}`
			)
			return
		}

		router.push(`/search?${queryParamsWithoutFilter}`)
	}

	return (
		<>
			<Modal title={modalInfo.title} content={modalInfo.content} />
			<OptionsContainer>
				<button type='button' onClick={handleSort} className='options__option'>
					<SortIcon />
					<p className='options__optionParagraph'>Ordenar</p>
				</button>
				<button type='button' onClick={handleFilter} className='options__option'>
					<FilterIcon />
					<p className='options__optionParagraph'>Filtrar</p>
				</button>
			</OptionsContainer>
			<TitleContainer>
				<h2>{searchTerm}</h2>
				{filtersUI.map((filterObject) => (
					<FilterSpan key={filterObject.key}>
						{filterObject.value}
						<button
							type='button'
							onClick={handleRemoveFilter(filterObject)}
							className='filter__close'
						>
							<CloseIcon />
						</button>
					</FilterSpan>
				))}
				<p>{products?.length || 0} resultados</p>
			</TitleContainer>
			<ItemsContainer>
				<LoadingOrItems />
			</ItemsContainer>
			{shouldPaginate && (
				<PaginationContainer>
					<Button
						disabled={!isTherePrevPage}
						type='button'
						onClick={handlePrevPage}
						className='pagination__button'
						outline
					>
						Anterior
					</Button>
					<p className='pagination__paragraph'>
						{Number(page) + 1} de {totalPages}
					</p>
					<Button
						disabled={!isThereNextPage}
						type='button'
						onClick={handleNextPage}
						className='pagination__button'
						outline
					>
						Siguiente
					</Button>
				</PaginationContainer>
			)}
		</>
	)
}

export default function Search(serverSideProps) {
	return (
		<ModalContextProvider>
			{/*  eslint-disable-next-line react/jsx-props-no-spreading */}
			<Page {...serverSideProps} />
		</ModalContextProvider>
	)
}

export function getServerSideProps(ctx) {
	const searchTerm = ctx.query.q || ''
	const page = ctx.query.page || 0
	const filters = qs.parse(ctx.query)?.filters || null
	const sort = ctx.query.sort || null

	const queryClient = new QueryClient()

	queryClient.prefetchQuery(
		[QueryKeys.GET_PRODUCTS, searchTerm, page, filters, sort],
		() => ProductsAPI.getSearchProducts(searchTerm, filters, sort)
	)

	return {
		props: {
			searchTerm,
			page,
			filters,
			sort,
			dehydratedState: dehydrate(queryClient)
		}
	}
}
