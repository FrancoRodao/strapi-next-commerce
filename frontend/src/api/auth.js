import { axiosConfigWithToken } from '../helpers/axiosConfigWithToken'
import { instance } from './instance'
import { userIsAuthenticated } from '../helpers/userIsAuthenticated'

function signIn({ username, password }) {
	return instance
		.post('/auth/local', {
			identifier: username,
			password
		})
		.then((res) => res)
}

function signUp({ email, username, password }) {
	return instance
		.post('/auth/local/register', {
			email,
			username,
			password
		})
		.then((res) => res.data)
}

function getMe(accessToken, serverSideContext = null) {
	if (!userIsAuthenticated(serverSideContext).isAuthenticated) {
		return null
	}

	const config = axiosConfigWithToken(accessToken)

	return instance.get('/users/me', config).then((res) => res.data)
}

export const AuthAPI = {
	signIn,
	signUp,
	getMe
}
