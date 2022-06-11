import { createContext, useContext, useMemo, useReducer } from 'react'
import { isProduction } from '../../helpers/isProduction'
import { types } from './types'

const CheckoutContext = createContext()

const initialState = {
	loading: {
		state: false,
		message: null
	},
	paymentStep: false
}

// eslint-disable-next-line consistent-return
export const checkoutStateReducer = (state, action) => {
	switch (action.type) {
		case types.init: {
			return initialState
		}

		case types.goToPaymentStep: {
			return {
				...state,
				paymentStep: true
			}
		}

		case types.loading: {
			if (typeof action.loading.state !== 'boolean' && !isProduction()) {
				throw new Error('loading state must be a boolean')
			}

			return {
				...state,
				loading: {
					state: action.loading.state,
					message: action.loading.message || null
				}
			}
		}

		default: {
			if (!isProduction()) {
				throw new Error(`Unhandled action type: ${action.type}`)
			}
		}
	}
}

export function CheckoutContextProvider({ children }) {
	const [state, dispatch] = useReducer(checkoutStateReducer, initialState)

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

	return (
		<CheckoutContext.Provider value={value}>{children}</CheckoutContext.Provider>
	)
}

export const useCheckoutContext = () => {
	const context = useContext(CheckoutContext)

	if (context === undefined) {
		throw new Error(
			'useCheckoutContext must be used within a CheckoutContextProvider'
		)
	}

	return context
}
