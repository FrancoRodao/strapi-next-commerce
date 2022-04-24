import Cookies from 'js-cookie'
import { isClientSide } from './isClientSide'

/**
 *
 * @param {object} serverSideContext context from getServerSideProps, getInitialProps or null if is client side
 * @returns {({accessToken, user, isAuthenticated})} object with userdata, accesstoken and isAuthenticated
 */
function userIsAuthenticated(serverSideContext = null) {
  let accessTokenValue
  let userValue

  /* Client side case */
  if (!serverSideContext && isClientSide()) {
    accessTokenValue = Cookies.get('accessToken')
    userValue = Cookies.get('user')
  } else if (!serverSideContext && !isClientSide()) {
    /* still on the server side */
    return {
      accessToken: null,
      user: null,
      isAuthenticated: false
    }
  }

  /* 
    in case of getInitialProps context 
  */
  if (serverSideContext?.ctx) {
    const { accessToken, user } = serverSideContext.ctx.req.cookies
    accessTokenValue = accessToken
    userValue = user
  }

  /* in case of ServerSideProps context */
  if (serverSideContext?.req) {
    const { accessToken, user } = serverSideContext.req.cookies
    accessTokenValue = accessToken
    userValue = user
  }

  if (accessTokenValue && userValue) {
    return {
      accessToken: accessTokenValue,
      user: userValue,
      isAuthenticated: true
    }
  }

  return {
    accessToken: null,
    user: null,
    isAuthenticated: false
  }
}

export { userIsAuthenticated }
