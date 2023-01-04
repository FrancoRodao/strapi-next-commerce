/* eslint-disable react/jsx-props-no-spreading */
import '../styles/normalize.css'
import '../styles/fonts/index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import App from 'next/app'
import PropTypes from 'prop-types'
import { ThemeProvider } from 'styled-components'
import {
	dehydrate,
	Hydrate,
	QueryClient,
	QueryClientProvider
} from 'react-query'
import { useState } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'

import { Toaster } from 'react-hot-toast'
import Layout from '../layout/Layout'
import { styledComponentsTheme } from '../styles/styledComponentsTheme'
import { AuthAPI } from '../api/auth'
import { QueryKeys } from '../constants/queryKeys.constant'
import { userIsAuthenticated } from '../helpers/userIsAuthenticated'

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// TODO: FIX IT IN PRODUCTION GOES
			// refetchOnWindowFocus: process.env.NODE_ENV === 'production',
			refetchOnWindowFocus: false,
			retry: 3
		},
		mutations: {
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
					<div id='app-modal' />
					<Toaster position='top-right' />
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ThemeProvider>
			</Hydrate>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}

MyApp.getInitialProps = async (appContext) => {
	const appProps = await App.getInitialProps(appContext)

	const queryClientInstance = new QueryClient()
	const { isAuthenticated, accessToken } = userIsAuthenticated(appContext)

	if (isAuthenticated) {
		queryClientInstance.prefetchQuery(
			QueryKeys.GET_ME,
			() => AuthAPI.getMe(accessToken),
			{
				staleTime: 6000 * 5 // 5 minutes
			}
		)
	}

	return {
		...appProps,
		dehydratedState: dehydrate(queryClientInstance)
	}
}

export default MyApp

MyApp.propTypes = {
	Component: PropTypes.func.isRequired,
	// eslint-disable-next-line react/forbid-prop-types
	pageProps: PropTypes.object.isRequired
}
