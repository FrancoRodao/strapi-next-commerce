import { useQuery } from 'react-query'
import { ProductsAPI } from '../api/products'
import { QueryKeys } from '../constants/queryKeys.constant'

export function useGetProduct(productId) {
  return useQuery([QueryKeys.GET_PRODUCT, productId], () =>
    ProductsAPI.getProduct(productId)
  )
}

export function useGetBestSellersProducts() {
  return useQuery(QueryKeys.GET_BEST_SELLERS_PRODUCTS, () =>
    ProductsAPI.getBestSellers()
  )
}

export function useGetOfferProducts() {
  return useQuery(QueryKeys.GET_OFFER_PRODUCTS, () =>
    ProductsAPI.getOfferProducts()
  )
}
