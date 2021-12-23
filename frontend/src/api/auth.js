import { instance } from './instance'

function login({ username, password }) {
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
    .then((res) => res)
}

function checkToken(token) {
  return instance
    .get('/users/me', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => res)
}

export const AuthAPI = {
  login,
  signUp,
  checkToken
}
