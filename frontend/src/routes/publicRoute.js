import { Auth } from '../api/auth'

const PublicRoute = (getServerSideProps) => async (context) => {
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

  const { req } = context

  const isAuthenticated = await Auth.checkToken(req.cookies.accessToken).catch(
    () => null
  )

  // can not access
  if (isAuthenticated) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  return getServerSideProps(context)
}

export { PublicRoute }
