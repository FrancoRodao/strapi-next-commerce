import Loading from '../Loading'

const loadingContainerStyles = {
  display: 'block',
  width: '100%',
  minHeight: 'inherit',
  margin: 'auto'
}

const loadingMessageStyles = {
  marginTop: '15px',
  marginLeft: '10px'
}

export function CheckoutLoading({ isLoading, message }) {
  return (
    <div style={isLoading ? loadingContainerStyles : { display: 'none' }}>
      <Loading>
        {message && <h3 style={loadingMessageStyles}>{message}</h3>}
      </Loading>
    </div>
  )
}
