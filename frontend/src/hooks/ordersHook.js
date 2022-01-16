import { useMutation } from 'react-query'
import { OrdersAPI } from '../api/orders'

export function useCreatePaypalStrapiOrder() {
  const { mutate, ...rest } = useMutation(OrdersAPI.createPaypalStrapiOrder)

  return {
    createPaypalStrapiOrder: mutate,
    ...rest
  }
}
