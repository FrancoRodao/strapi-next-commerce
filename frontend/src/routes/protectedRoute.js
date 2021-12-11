import { userIsAuthenticated } from '../helpers/userIsAuthenticated'

const ProtectedRoute = (getServerSideProps) => async (context) => {
  if (!getServerSideProps) {
    // eslint-disable-next-line no-param-reassign
    getServerSideProps = () => ({
      /* 
        It must return props even if they are empty, 
        if not nextjs gives an error 
      */
      props: {}
    })
  }

  const isAuthenticated = userIsAuthenticated(context)

  // can not access
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return getServerSideProps(context)
}

export { ProtectedRoute }
