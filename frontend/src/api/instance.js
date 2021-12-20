import axios from 'axios'
import { userIsAuthenticated } from '../helpers/userIsAuthenticated'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

// add accesstoken on every request
instance.interceptors.request.use((config) => {
  const { isAuthenticated, accessToken } = userIsAuthenticated()

  if (isAuthenticated) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})
