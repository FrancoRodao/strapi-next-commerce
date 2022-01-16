import { useRouter } from 'next/router'
import toast from 'react-hot-toast'
import { useQueryClient } from 'react-query'
import { QueryKeys } from '../../../constants/queryKeys.constant'
import { createPaypalOrderObject } from '../../../helpers/createPaypalOrderObject'
import { useCreatePaypalStrapiOrder } from '../../../hooks/ordersHook'
import { useGetProduct } from '../../../hooks/productHook'
import Loading from '../../Loading'
import { PaypalPaymentOption } from './options/PaypalPaymentOption'
import { checkoutProductValidations } from '../../../helpers/checkoutValidations'

export function ProductPayment({ productId, selectedQuantity }) {
  const {
    data: product,
    refetch: refetchProduct,
    isLoading,
    isError
  } = useGetProduct(productId)
  const queryClient = useQueryClient()
  const { createPaypalStrapiOrder } = useCreatePaypalStrapiOrder()
  const router = useRouter()

  // TODO: IMPROVE THE LOADING / ERROR SCREEN
  if (isLoading || isError) {
    return <Loading />
  }

  const handleCreateOrder = async (_, actions) => {
    const totalPrice =
      (product.precio_oferta || product.precio) * selectedQuantity

    const order = [
      {
        product,
        quantity: selectedQuantity
      }
    ]

    const paypalOrder = actions.order.create(
      createPaypalOrderObject(order, totalPrice)
    )

    return paypalOrder
  }

  const handleOnApprove = async (_, actions) => {
    try {
      // refresh data
      await queryClient.invalidateQueries([QueryKeys.GET_PRODUCT, productId], {
        exact: true
      })
      const updatedProductQuery = await refetchProduct({
        throwOnError: true
      })

      if (
        !checkoutProductValidations(updatedProductQuery.data, selectedQuantity)
      ) {
        toast.error(
          'El producto no está disponible o no hay suficiente stock, inténtelo mas tarde'
        )
        router.push('/')
        return
      }

      actions.order.capture().then((orderData) => {
        const orderId = orderData.id

        createPaypalStrapiOrder({
          orderId
        })
      })
    } catch (error) {
      toast.error('Ocurrió un error inesperado')
      router.push('/')
    }
  }

  return (
    <PaypalPaymentOption
      createOrder={handleCreateOrder}
      onApprove={handleOnApprove}
    />
  )
}
