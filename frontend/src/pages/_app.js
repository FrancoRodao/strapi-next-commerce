/* eslint-disable react/jsx-props-no-spreading */
import '../styles/normalize.css'
import '../styles/fonts/index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import App from 'next/app'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

import Layout from '../layout/Layout'
import { styledComponentsTheme } from '../styles/styledComponentsTheme'
import { UserContext, userReducer } from '../context/User/UserContext'
import { Auth } from '../api/auth'
import { types } from '../context/User/types'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3
    }
  }
})

function MyApp({ Component, pageProps, userContextInitialState }) {
  const [queryClientState] = useState(() => queryClient)

  return (
    <QueryClientProvider client={queryClientState}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={styledComponentsTheme}>
          <UserContext initialState={userContextInitialState}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContext>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

/*
  We need to get the initial state of the user context on the server; 
  otherwise when getting the status on the client side 
  there is a little lag when loading and for example 
  the navbar component renders twice, once to show that the user is not 
  authenticated (has not yet loaded the status on the client) 
  and another when it finishes loading the status that shows 
  that it was really already authenticated
*/
MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext)

  // TODO: REFACTOR RETURN
  return Auth.checkToken(appContext.ctx.req.cookies.accessToken)
    .then((res) => {
      const userData = res.data
      delete userData.carrito
      delete userData.role
      delete userData.provider

      return {
        userContextInitialState: userReducer(
          {},
          {
            type: types.signIn,
            data: userData
          }
        ),
        ...appProps
      }
    })
    .catch(() => ({
      userContextInitialState: userReducer({}, { type: types.logout }),
      ...appProps
    }))
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  userContextInitialState: PropTypes.object.isRequired
}
