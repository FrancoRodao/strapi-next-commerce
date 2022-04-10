import { createContext, useContext, useMemo, useReducer, useState } from 'react'
import { isProduction } from '../../helpers/isProduction'
import { types } from './types'

const ModalContext = createContext()

const initialState = {
  opened: false,
  title: '',
  content: null
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

    case types.CHANGE_MODAL_INFO: {
      return {
        ...state,
        title: action.title || state.title,
        content: action.content || state.content
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

export const useModalContext = (
  modalInfoInitialState = {
    title: '',
    content: null
  }
) => {
  const context = useContext(ModalContext)

  if (context === undefined) {
    throw new Error(
      'useModalContext must be used within a ModalContextProvider'
    )
  }

  const { state, dispatch } = context

  return {
    ...context,
    toggleModal: () => dispatch({ type: types.TOGGLE_MODAL }),
    modalInfo: {
      title: state.title,
      content: state.content
    },
    setModalInfo: ({ title, content }) => {
      dispatch({ type: types.CHANGE_MODAL_INFO, title, content })
    }
  }
}
