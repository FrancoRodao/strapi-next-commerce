import Cookies from 'js-cookie'
import { createContext, useContext, useMemo, useReducer } from 'react'
import { types } from './types'

const Context = createContext()

// eslint-disable-next-line consistent-return
export const userReducer = (state, action) => {
  switch (action.type) {
    case types.init: {
      return {
        ...state,
        data: action.data,
        isAuthenticated: true
      }
    }

    case types.signIn: {
      Cookies.set('accessToken', action.jwt, {
        sameSite: 'strict'
      })
      Cookies.set('user', JSON.stringify(action.data), {
        sameSite: 'strict'
      })

      return {
        ...state,
        data: action.data,
        isAuthenticated: true
      }
    }

    case types.logout: {
      Cookies.remove('user')
      Cookies.remove('accessToken')

      return {
        ...state,
        data: null,
        isAuthenticated: false
      }
    }

    default:
      break
  }
}

export function UserContext({ children, initialState }) {
  const [state, dispatch] = useReducer(userReducer, initialState)

  /*
    Memorize the states to prevent unnecessary re-renders.
  */
  const value = useMemo(
    () => ({
      state,
      dispatch
    }),
    [state, dispatch]
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useUserContext = () => useContext(Context)
