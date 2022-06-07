import { useState } from 'react'
import Link from 'next/link'
import { PublicRoute } from '../routes/publicRoute'
import { useSignUp } from '../hooks/authHook'
import Login from '../components/Login/Login'
import LoginForm from '../components/Login/LoginForm'
import LoginField from '../components/Login/LoginField'
import { Button } from '../components/Button'
import { ImageStep } from '../components/Login/ImageStep'

export default function Signup() {
  const [errorUI, setErrorUI] = useState(null)
  const [imageStep, setImageStep] = useState(false)

  const { signUp, isLoading } = useSignUp({
    onSuccess: () => setImageStep(true),
    onError: (error) => {
      if (
        error.response.data.message[0].messages[0].id ===
        'Auth.form.error.email.taken'
      ) {
        setErrorUI('El email o el usuario ya están en uso')
        return
      }

      setErrorUI('Error inesperado, intente mas tarde')
    }
  })

  const formSubmit = (e) => {
    e.preventDefault()
    const form = {
      email: e.target[0].value,
      username: e.target[1].value,
      password: e.target[2].value
    }

    signUp(form)
  }

  return (
    <>
      {imageStep ? (
        <ImageStep />
      ) : (
        <Login
          title="¡Hola! Completa el formulario para el registro"
          errorUI={errorUI}
        >
          <LoginForm onSubmit={formSubmit}>
            <LoginField
              fieldTitle="Email"
              inputName="email"
              type="email"
              autoFocus
            />
            <LoginField fieldTitle="Usuario" inputName="username" />
            <LoginField
              fieldTitle="Contraseña"
              inputName="password"
              inputType="password"
            />
            <Button
              style={{ marginBottom: '15px' }}
              isLoading={isLoading}
              disabled={isLoading}
              type="submit"
            >
              Continuar
            </Button>
          </LoginForm>
          <Link href="/signin" passHref>
            <a href="signin">
              <Button style={{ marginBottom: '15px' }} outline>
                Iniciar sesión
              </Button>
            </a>
          </Link>
        </Login>
      )}
    </>
  )
}

export const getServerSideProps = PublicRoute()
