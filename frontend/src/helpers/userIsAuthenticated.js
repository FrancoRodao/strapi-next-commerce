import Cookies from 'js-cookie'

/**
 *
 * @param {object} serverSideContext context from getServerSideProps, getInitialProps or null if is client side
 * @returns {(object | null)} object with user data and accesstoken or null
 */
function userIsAuthenticated(serverSideContext = null) {
  let accessTokenValue
  let userValue

  /* Client side case */
  if (!serverSideContext) {
    accessTokenValue = Cookies.get('accessToken')
    userValue = Cookies.get('user')
  }

  /* 
    in case of component.getInitialProps context 
  */
  if (serverSideContext.ctx) {
    const { accessToken, user } = serverSideContext.ctx.req.cookies
    accessTokenValue = accessToken
    userValue = user
  } else {
    /* in case of ServerSideProps context */
    const { accessToken, user } = serverSideContext.req.cookies
    accessTokenValue = accessToken
    userValue = user
  }

  if (accessTokenValue && userValue) {
    return {
      accessToken: accessTokenValue,
      user: userValue
    }
  }

  return null
}

export { userIsAuthenticated }
