import { useMutation } from 'react-query'
import { OrdersAPI } from '../api/orders'

export function useCreateOrder() {
  const { mutate, ...rest } = useMutation(OrdersAPI.createOrder)

  return {
    createOrder: mutate,
    ...rest
  }
}
