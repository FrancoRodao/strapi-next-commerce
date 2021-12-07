/* eslint-disable react/jsx-props-no-spreading */
import '../styles/normalize.css'
import '../styles/fonts/index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { useState } from 'react'

import Layout from '../layout/Layout'
import { styledComponentsTheme } from '../styles/styledComponentsTheme'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 3
    }
  }
})

function MyApp({ Component, pageProps }) {
  const [queryClientState] = useState(() => queryClient)

  return (
    <QueryClientProvider client={queryClientState}>
      <Hydrate state={pageProps.dehydratedState}>
        <ThemeProvider theme={styledComponentsTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired
}
