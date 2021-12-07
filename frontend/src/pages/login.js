import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import cookies from 'js-cookie'
import { Auth } from '../api/auth'
import { PublicRoute } from '../routes/publicRoute'

function Login() {
  const [errorUI, setErrorUI] = useState(null)

  const Router = useRouter()

  const mutation = useMutation(Auth.login, {
    onSuccess: ({ data }) => {
      const userData = {
        ...data.user
      }
      delete userData.carrito
      delete userData.role

      cookies.set('accessToken', data.jwt, {
        sameSite: 'strict'
      })
      cookies.set('user', JSON.stringify(userData), {
        sameSite: 'strict'
      })

      Router.push('/')
    },
    onError: (error) => {
      if (error.response.data.statusCode === 400) {
        setErrorUI('Credenciales invalidas')
        return
      }

      setErrorUI('Error inesperado, intente mas tarde')
    }
  })

  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const login = (e) => {
    e.preventDefault()
    mutation.mutate(form)
  }

  const changeField = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <>
      {errorUI}
      <form onSubmit={login}>
        <input
          name="username"
          value={form.username}
          type="text"
          onChange={changeField}
        />
        <input
          name="password"
          value={form.password}
          type="password"
          onChange={changeField}
        />
        <button type="submit"> Login </button>
      </form>
    </>
  )
}

// If the user is logged in, they should not access the page
export const getServerSideProps = PublicRoute()

export default Login
