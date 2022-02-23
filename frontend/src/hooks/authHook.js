/* eslint-disable no-unused-vars */
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { AuthAPI } from '../api/auth'
import { QueryKeys } from '../constants/queryKeys.constant'

export function useSignIn(
  options = {
    onSuccess: (response) => {},
    onError: (error) => {}
  }
) {
  const router = useRouter()
  const queryClient = useQueryClient()

  const { mutate, ...rest } = useMutation(AuthAPI.signIn, {
    onSuccess: (response) => {
      const { data } = response

      const userData = {
        ...data.user
      }
      delete userData.carrito
      delete userData.role
      delete userData.provider
      delete userData.pedidos

      Cookies.set('accessToken', data.jwt, {
        sameSite: 'strict'
      })
      Cookies.set('user', JSON.stringify(userData), {
        sameSite: 'strict'
      })

      queryClient.setQueryData(QueryKeys.GET_ME, data.user)

      if (options?.onSuccess) {
        options?.onSuccess(response)
      }

      router.back()
    },
    onError: (error) => {
      if (options?.onError) {
        options?.onError(error)
      }
    }
  })

  return {
    signIn: mutate,
    ...rest
  }
}

export function useSignUp(
  options = {
    onSuccess: (response) => {},
    onError: (error) => {}
  }
) {
  const { mutate, ...rest } = useMutation(AuthAPI.signUp, {
    onSuccess: (response) => {
      const { user, jwt } = response

      const userData = {
        ...user
      }
      delete userData.carrito
      delete userData.role
      delete userData.provider

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
    signUp: mutate,
    ...rest
  }
}

export function useLogout() {
  const queryClient = useQueryClient()

  return {
    logout() {
      Cookies.remove('user')
      Cookies.remove('accessToken')
      queryClient.setQueryData(QueryKeys.GET_ME, null)
    }
  }
}

export function useGetMe() {
  return useQuery(QueryKeys.GET_ME, () => AuthAPI.getMe(), {
    staleTime: 6000 * 5 // 5 minutes
  })
}
