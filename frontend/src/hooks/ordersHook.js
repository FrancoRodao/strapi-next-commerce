import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useMutation, useQuery } from 'react-query'
import { OrdersAPI } from '../api/orders'
import { QueryKeys } from '../constants/queryKeys.constant'

export function useCreatePaypalStrapiOrder() {
  const { mutate, ...rest } = useMutation(OrdersAPI.createPaypalStrapiOrder)

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
