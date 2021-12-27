import { useState } from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { PublicRoute } from '../routes/publicRoute'
import { ErrorMessage } from '../components/ErrorMessage'
import Loading from '../components/Loading'
import { useSignIn } from '../hooks/authHook'

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


    &__submit {
      &--btn {
        max-height: 53px;
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

      &--loading{
        background-color: ${({ theme }) => theme.borderGreylight};

        &:hover {
          background-color: ${({ theme }) => theme.borderGreylight};
        }
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

function SignIn() {
  const [errorUI, setErrorUI] = useState(null)

  const { signIn } = useSignIn({
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

  const handleSignIn = (e) => {
    e.preventDefault()
    setErrorUI(false)
    signIn(form)
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
      <div className="container">
        {errorUI && <ErrorMessage>{errorUI}</ErrorMessage>}
        <h1 className="title">
          ¡Hola! Ingresa tus credenciales para iniciar sesion
        </h1>
        <form className="form" onSubmit={handleSignIn}>
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
          <button
            disabled={signIn.isLoading}
            className={`form__submit--btn ${
              signIn.isLoading ? 'form__submit--loading' : ''
            }`}
            type="submit"
          >
            {signIn.isLoading ? <Loading /> : 'Ingresar'}
          </button>
        </form>
        <Link href="/signup">
          <a className="register-btn" href="signup">
            Crear cuenta
          </a>
        </Link>
      </div>
    </LoginContainer>
  )
}

// If the user is logged in, they should not access the page
export const getServerSideProps = PublicRoute()

export default SignIn
