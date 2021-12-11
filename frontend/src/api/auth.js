import { instance } from './instance'

function login({ username, password }) {
  return instance.post('/auth/local', {
    identifier: username,
    password
  })
}

function signUp({ email, username, password }) {
  return instance.post('/auth/local/register', {
    email,
    username,
    password
  })
}

function checkToken(token) {
  return instance.get('/users/me', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const Auth = {
  login,
  signUp,
  checkToken
}
