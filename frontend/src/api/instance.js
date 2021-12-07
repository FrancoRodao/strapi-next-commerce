import axios from 'axios'
import cookies from 'js-cookie'

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true
})

// add accesstoken on every request
instance.interceptors.request.use((config) => {
  const token = cookies.get('accessToken')
  if (token) {
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})
