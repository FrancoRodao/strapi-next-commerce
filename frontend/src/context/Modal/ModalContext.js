import { createContext, useContext, useMemo, useReducer } from 'react'
import { isProduction } from '../../helpers/isProduction'
import { types } from './types'

const ModalContext = createContext()

const initialState = {
  opened: false
}

// eslint-disable-next-line consistent-return
export const modalStateReducer = (state, action) => {
  switch (action.type) {
    case types.init: {
      return initialState
    }

    case types.TOGGLE_MODAL: {
      return {
        ...state,
        opened: !state.opened
      }
    }

    default: {
      if (!isProduction()) {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }
}

export function ModalContextProvider({ children }) {
  const [state, dispatch] = useReducer(modalStateReducer, initialState)

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

  return <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
}

export const useModalContext = () => {
  const context = useContext(ModalContext)

  if (context === undefined) {
    throw new Error(
      'useModalContext must be used within a ModalContextProvider'
    )
  }

  return context
}
