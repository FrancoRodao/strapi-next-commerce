import { Auth } from '../api/auth'

const ProtectedRoute = (getServerSideProps) => async (context) => {
  if (!getServerSideProps) {
    // eslint-disable-next-line no-param-reassign
    getServerSideProps = () => ({})
  }

  const { req } = context

  const isAuthenticated = await Auth.checkToken(req.cookies.accessToken).catch(
    () => null
  )

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
