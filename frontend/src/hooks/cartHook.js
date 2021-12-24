import { useMutation, useQuery, useQueryClient } from 'react-query'
import { CartAPI } from '../api/cart'
import { QueryKeys } from '../constants/queryKeys.constant'

// const areFunctions = (...args) => {
//   const fs = [args]
//   console.log(fs)
//   fs.forEach((f) => {
//     console.log(typeof f)
//   })
// }

export function useGetUserCart() {
  return useQuery(QueryKeys.GET_USER_CART, () => CartAPI.getCart())
}

export function useAddCartItem(productId, quantity = 1) {
  const queryClient = useQueryClient()

  return useMutation(() => CartAPI.addCartItem([{ productId, quantity }]), {
    onSuccess: () => queryClient.invalidateQueries(QueryKeys.GET_USER_CART)
  })
}

export function useRemoveOneToCartItem(cartItemId) {
  const queryClient = useQueryClient()

  return useMutation(() => CartAPI.subtractOne(cartItemId), {
    onSuccess: () => queryClient.invalidateQueries(QueryKeys.GET_USER_CART)
  })
}

export function useDeleteCartItem(cartItemId) {
  const queryClient = useQueryClient()

  return useMutation(() => CartAPI.deleteCartItem(cartItemId), {
    onSuccess: () => queryClient.invalidateQueries(QueryKeys.GET_USER_CART)
  })
}
