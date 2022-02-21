/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { useMutation, useQuery } from 'react-query'
import { AuthAPI } from '../api/auth'
import { QueryKeys } from '../constants/queryKeys.constant'
import { types } from '../context/User/types'
import { useUserContext } from '../context/User/UserContext'

export function useSignIn(
  options = {
    onSuccess: (response) => {},
    onError: (error) => {}
  }
) {
  const Router = useRouter()
  const { dispatch } = useUserContext()

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

      dispatch({
        type: types.signIn,
        jwt: data.jwt,
        data: userData
      })

      if (options?.onSuccess) {
        options?.onSuccess(response)
      }

      Router.back()
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
  const { dispatch } = useUserContext()

  const { mutate, ...rest } = useMutation(AuthAPI.signUp, {
    onSuccess: (response) => {
      const { user, jwt } = response

      const userData = {
        ...user
      }
      delete userData.carrito
      delete userData.role
      delete userData.provider

      dispatch({
        type: types.signIn,
        jwt,
        data: userData
      })

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

export function useGetMe() {
  return useQuery(QueryKeys.GET_ME, () => AuthAPI.getMe(), {
    staleTime: 6000 * 5 // 5 minutes
  })
}
