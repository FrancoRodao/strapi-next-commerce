import { useMutation, useQuery, useQueryClient } from 'react-query'
import { CartAPI } from '../api/cart'
import { QueryKeys } from '../constants/queryKeys.constant'
import { filterCart } from '../helpers/filterCart'

export async function getUserCartQuery(
	options = {
		checkoutCartValidations: false,
		accessToken: null
	}
) {
	const data = await CartAPI.getCart(options?.accessToken)

	if (options?.checkoutCartValidations) {
		return filterCart(
			data,
			{
				unpublishedProducts: true,
				productsOutOfStock: true,
				checkAndUpdateCartItemsStock: true
			},
			options?.accessToken
		)
	}

	return filterCart(
		data,
		{
			unpublishedProducts: false,
			productsOutOfStock: false,
			checkAndUpdateCartItemsStock: true
		},
		options?.accessToken
	)
}

export function useGetUserCart(
	options = { checkoutCartValidations: false, accessToken: null }
) {
	return useQuery(
		QueryKeys.GET_USER_CART,
		async () => getUserCartQuery(options),
		{
			staleTime: 5 * 60000 // 5 minutes
		}
	)
}

export function useAddCartItem(productId, quantity = 1) {
	const queryClient = useQueryClient()

	const { mutate, ...rest } = useMutation(
		() => CartAPI.addCartItem([{ productId, quantity }]),
		{
			onSuccess: (data) => {
				queryClient.setQueryData(QueryKeys.GET_USER_CART, data)
			}
		}
	)

	return {
		addCartItem: mutate,
		...rest
	}
}

export function useRemoveOneToCartItem(cartItemId) {
	const queryClient = useQueryClient()

	const { mutate, ...rest } = useMutation(
		() => CartAPI.subtractOne(cartItemId),
		{
			onSuccess: (data) => {
				queryClient.setQueryData(QueryKeys.GET_USER_CART, data)
			}
		}
	)

	return {
		removeOneToCartItem: mutate,
		...rest
	}
}

export function useDeleteCartItem(
	cartItemId,
	options = {
		onSuccess: (response) => {}
	}
) {
	const queryClient = useQueryClient()

	const { mutate, ...rest } = useMutation(
		() => CartAPI.deleteCartItem(cartItemId),
		{
			onSuccess: (data) => {
				queryClient.setQueryData(QueryKeys.GET_USER_CART, data)

				if (options?.onSuccess) {
					options.onSuccess()
				}
			}
		}
	)

	return {
		deleteCartItem: mutate,
		...rest
	}
}

export function useClearCart(
	options = {
		onSuccess: (response) => {}
	}
) {
	const queryClient = useQueryClient()

	const { mutate, ...rest } = useMutation(() => CartAPI.clearCart(), {
		onSuccess: (data) => {
			queryClient.setQueryData(QueryKeys.GET_USER_CART, [])

			if (options?.onSuccess) {
				options.onSuccess()
			}
		}
	})

	return {
		clearCart: mutate,
		...rest
	}
}
