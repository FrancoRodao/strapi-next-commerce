import React from 'react'

export function CheckoutContentContainer({ children, isLoading }) {
  return (
    <div style={isLoading ? { display: 'none' } : { display: 'flex' }}>
      {children}
    </div>
  )
}
