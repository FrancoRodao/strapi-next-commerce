/* eslint-disable no-unused-vars */
import { useMutation, useQueryClient } from 'react-query'
import { ProfileAPI } from '../api/profile'
import { QueryKeys } from '../constants/queryKeys.constant'

export function useUpdateProfileImage(
	options = { onSuccess: (response) => {} }
) {
	const { mutate, ...rest } = useMutation(ProfileAPI.updateProfileImage, {
		onSuccess: (response) => {
			if (options?.onSuccess) {
				options?.onSuccess(response)
			}
		}
	})

	return {
		updateProfileImage: mutate,
		...rest
	}
}

export function useChangeUserEmail(
	options = { onSuccess: (response) => {}, onError: (error) => {} }
) {
	const queryClient = useQueryClient()

	const { mutate, ...rest } = useMutation(ProfileAPI.changeUserEmail, {
		onSuccess: (response) => {
			queryClient.setQueryData(QueryKeys.GET_ME, (old) => ({
				...old,
				email: response.newEmail
			}))

			if (options?.onSuccess) {
				options?.onSuccess(response)
			}
		},
		onError: (error) => {
			if (options?.onError) {
				options?.onError(error)
			}
		}
	})

	return {
		changeUserEmail: mutate,
		...rest
	}
}

export function useChangeUserUsername(
	options = { onSuccess: (response) => {}, onError: (error) => {} }
) {
	const queryClient = useQueryClient()

	const { mutate, ...rest } = useMutation(ProfileAPI.changeUserUsername, {
		onSuccess: (response) => {
			queryClient.setQueryData(QueryKeys.GET_ME, (old) => ({
				...old,
				username: response.newUsername
			}))

			if (options?.onSuccess) {
				options?.onSuccess(response)
			}
		},
		onError: (error) => {
			if (options?.onError) {
				options?.onError(error)
			}
		}
	})

	return {
		changeUserUsername: mutate,
		...rest
	}
}

export function useChangeUserPassword(
	options = { onSuccess: (response) => {}, onError: (error) => {} }
) {
	const { mutate, ...rest } = useMutation(ProfileAPI.changeUserPassword, {
		onSuccess: (response) => {
			if (options?.onSuccess) {
				options?.onSuccess(response)
			}
		},
		onError: (error) => {
			if (options?.onError) {
				options?.onError(error)
			}
		}
	})

	return {
		changeUserPassword: mutate,
		...rest
	}
}
