/* eslint-disable no-unused-vars */
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import { AuthAPI } from '../api/auth'
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

  return useMutation(AuthAPI.signIn, {
    onSuccess: (response) => {
      const { data } = response

      const userData = {
        ...data.user
      }
      delete userData.carrito
      delete userData.role
      delete userData.provider

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
}

export function useSignUp(
  options = {
    onSuccess: (response) => {},
    onError: (error) => {}
  }
) {
  const Router = useRouter()
  const { dispatch } = useUserContext()

  return useMutation(AuthAPI.signUp, {
    onSuccess: (response) => {
      const { data } = response

      const userData = {
        ...data.user
      }
      delete userData.carrito
      delete userData.role
      delete userData.provider

      dispatch({
        type: types.signIn,
        jwt: data.jwt,
        data: userData
      })

      if (options?.onSuccess) {
        options?.onSuccess(response)
      }

      Router.push('/')
    },
    onError: (error) => {
      if (options?.onError) {
        options?.onError(error)
      }
    }
  })
}
