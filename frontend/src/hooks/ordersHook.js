import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import { OrdersAPI } from '../api/orders'
import { QueryKeys } from '../constants/queryKeys.constant'

export function useCreatePaypalStrapiOrder(
  options = {
    onSuccess: (response) => {}
  }
) {
  const { mutate, ...rest } = useMutation(OrdersAPI.createPaypalStrapiOrder, {
    onSuccess: (response) => {
      if (options.onSuccess) {
        options.onSuccess(response)
      }
    }
  })

  return {
    createPaypalStrapiOrder: mutate,
    ...rest
  }
}

export function useGetUserOrder(orderId) {
  const router = useRouter()

  return useQuery(
    [QueryKeys.GET_USER_ORDER, orderId],
    () => OrdersAPI.getUserOrder(orderId),
    {
      onError: (e) => {
        if (e.response?.status === 404) {
          toast.error('No se encontró el pedido')
          router.push('/profile')
        }
      },
      retry: 2,
      staleTime: Infinity
    }
  )
}

export function useGetUserOrders() {
  return useQuery(QueryKeys.GET_USER_ORDERS, () => OrdersAPI.getUserOrders(), {
    retry: 2,
    staleTime: 6000 * 5 // 5 minutes
  })
}
