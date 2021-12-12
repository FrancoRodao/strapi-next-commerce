import { useState } from 'react'
import { useRouter } from 'next/router'
import { useMutation } from 'react-query'
import styled from 'styled-components'
import Link from 'next/link'
import { Auth } from '../api/auth'
import { PublicRoute } from '../routes/publicRoute'
import { useUserContext } from '../context/User/UserContext'
import { types } from '../context/User/types'

export const LoginContainer = styled.div`
  display: flex;
  margin: auto;
  min-height: inherit;
  max-height: 50%;

  .title {
    font-size: 20px;
    margin: 20px 0px;
  }

  .container {
    padding: 15px 55px;
    width: 100%;
    max-width: 40%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    margin: 50px auto;
  }

  .form {
    display: flex;
    flex-direction: column;

    &__input {
      padding: 10px;
      box-shadow: 0 0 0 1px rgba(0,0,0,.25);      
      border-radius: 5px;
      margin-bottom: 15px;
      outline: none;
      border-color: transparent;

      &:focus{
        box-shadow: 0 0 0 .125em #3483fa;
      }
    }

    &__title {
      margin-bottom: 5px;
    }

    &__submit-btn {
      border-color: transparent;
      padding: 15px;
      border-radius: 5px;
      background-color: ${({ theme }) => theme.blue};
      color: #fff;
      font-weight: 600;
      cursor: pointer;
      margin: 15px 0;
      transition: background-color 0.3s;

      
      &:hover {
        background-color: #3877d6;
      }
    }
  }

  .register-btn {
    text-align: center;
    color: ${({ theme }) => theme.blue};
    font-weight: 600;
    cursor: pointer;
    border-radius: 5px;
    margin-bottom: 15px;
    padding: 15px;
    transition: background-color 0.3s;
    
    &:hover {
        background-color: #ceddf2;
      }
    }
  }
`

function Login() {
  const [errorUI, setErrorUI] = useState(null)

  const Router = useRouter()
  const { dispatch } = useUserContext()

  const mutation = useMutation(Auth.login, {
    onSuccess: ({ data }) => {
      const userData = {
        ...data.user
      }
      delete userData.carrito
      delete userData.role
      delete userData.provider

      dispatch({
        type: types.signIn,
        jwt: data.jwt,
        data: userData
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
    <LoginContainer>
      {errorUI}
      <div className="container">
        <h1 className="title">
          ¡Hola! Ingresa tus credenciales para iniciar sesion
        </h1>
        <form className="form" onSubmit={login}>
          <p className="form__title">Usuario</p>
          <input
            name="username"
            value={form.username}
            type="text"
            onChange={changeField}
            className="form__input"
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
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
          <button className="form__submit-btn" type="submit">
            Ingresar
          </button>
        </form>
        <Link href="/signup">
          <a className="register-btn" href="ignore">
            Crear cuenta
          </a>
        </Link>
      </div>
    </LoginContainer>
  )
}

// If the user is logged in, they should not access the page
export const getServerSideProps = PublicRoute()

export default Login
