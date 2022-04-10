import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useQuery } from 'react-query'
import { ProductsAPI } from '../api/products'
import { QueryKeys } from '../constants/queryKeys.constant'

export function useGetSearchProducts(searchTerm, page, filters, sort) {
  return useQuery(
    [QueryKeys.GET_PRODUCTS, searchTerm, page, filters, sort],
    () => ProductsAPI.getSearchProducts(searchTerm, filters, sort),
    {
      staleTime: 60000 * 5 // 5 minutes
    }
  )
}

export function useGetProduct(productId) {
  const router = useRouter()

  return useQuery(
    [QueryKeys.GET_PRODUCT, productId],
    () => ProductsAPI.getProduct(productId),
    {
      onError: (e) => {
        if (e.response?.status === 404) {
          toast.error('El producto no esta disponible por el momento')
          router.push('/')
        }
      },
      staleTime: 60000 * 5 // 5 minutes
    }
  )
}

export function useGetBestSellersProducts() {
  return useQuery(
    QueryKeys.GET_BEST_SELLERS_PRODUCTS,
    () => ProductsAPI.getBestSellers(),
    {
      staleTime: Infinity
    }
  )
}

export function useGetOfferProducts() {
  return useQuery(
    QueryKeys.GET_OFFER_PRODUCTS,
    () => ProductsAPI.getOfferProducts(),
    {
      staleTime: Infinity
    }
  )
}
