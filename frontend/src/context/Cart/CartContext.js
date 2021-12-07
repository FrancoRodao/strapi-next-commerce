import { createContext, useContext, useReducer } from 'react'
import { types } from './types'

const Context = createContext()

// eslint-disable-next-line consistent-return
const cartReducer = (state, action) => {
  switch (action.type) {
    case types.AddProduct: {
      const existProductInCartIndex = state.cart.findIndex(
        (product) => product.id === action.payload.id
      )

      /*
        do not duplicate the products that are in the cart, 
        just add the quantities to buy
      */

      if (existProductInCartIndex > -1) {
        // deep copy
        const cartCopy = JSON.parse(JSON.stringify(state.cart))
        cartCopy[existProductInCartIndex].quantity += action.payload.quantity

        return {
          ...state,
          cart: cartCopy
        }
      }

      return {
        ...state,
        cart: [...state.cart, action.payload]
      }
    }

    default:
      break
  }
}

export function CartContext({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    cart: []
  })

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  )
}

export const useCartContext = () => useContext(Context)
