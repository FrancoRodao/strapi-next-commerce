import { useRouter } from 'next/router'
import { useState } from 'react'
import { useMutation } from 'react-query'
import Link from 'next/link'
import { AuthAPI } from '../api/auth'
import { types } from '../context/User/types'
import { useUserContext } from '../context/User/UserContext'
import { LoginContainer } from './login'
import { PublicRoute } from '../routes/publicRoute'
import Loading from '../components/Loading'

export default function Signup() {
  const [errorUI, setErrorUI] = useState(null)

  const Router = useRouter()
  const { dispatch } = useUserContext()

  const mutation = useMutation(AuthAPI.signUp, {
    onSuccess: ({ data }) => {
      const userData = {
        ...data.user
      }
      delete userData.carrito
      delete userData.role
      delete userData.provsignup
      dispatch({
        type: types.signIn,
        jwt: data.jwt,
        data: userData
      })

      Router.push('/')
    },
    onError: (error) => {
      if (error.response.data.statusCode === 400) {
        setErrorUI('El usuario ya existe')
        return
      }

      setErrorUI('Error inesperado, intente mas tarde')
    }
  })

  const [form, setForm] = useState({
    email: '',
    username: '',
    password: ''
  })

  const signup = (e) => {
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
    <LoginContainer>
      {errorUI}
      <div className="container">
        <h1 className="title">
          ¡Hola! Completa el formulario para el registro
        </h1>
        <form className="form" onSubmit={signup}>
          <p className="form__title">Email</p>
          <input
            name="email"
            value={form.email}
            type="text"
            onChange={changeField}
            className="form__input"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            required
          />
          <p className="form__title">Usuario</p>
          <input
            name="username"
            value={form.username}
            type="text"
            onChange={changeField}
            className="form__input"
            required
          />
          <p className="form__title">Contraseña</p>
          <input
            name="password"
            value={form.password}
            type="password"
            onChange={changeField}
            className="form__input"
            required
          />
          <button
            disabled={mutation.isLoading}
            className={`form__submit--btn ${
              mutation.isLoading ? 'form__submit--loading' : ''
            }`}
            type="submit"
          >
            {mutation.isLoading ? <Loading /> : 'Registrarse'}
          </button>
        </form>
        <Link href="/login">
          <a className="register-btn" href="ignore">
            Iniciar sesion
          </a>
        </Link>
      </div>
    </LoginContainer>
  )
}

export const getServerSideProps = PublicRoute()
