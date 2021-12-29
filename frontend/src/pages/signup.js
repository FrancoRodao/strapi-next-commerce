import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { PublicRoute } from '../routes/publicRoute'
import Loading from '../components/Loading'
import { useSignUp } from '../hooks/authHook'
import Login from '../components/Login/Login'
import LoginForm from '../components/Login/LoginForm'
import LoginField from '../components/Login/LoginField'
import { Button } from '../components/Button'

export default function Signup() {
  const [errorUI, setErrorUI] = useState(null)

  const { signUp, isLoading } = useSignUp({
    onSuccess: (response) => {
      toast(
        <span>
          Bienvenido <b>{response.user.username}</b>
        </span>,
        {
          icon: '👋'
        }
      )
    },
    onError: (error) => {
      if (
        error.response.data.message[0].messages[0].id ===
        'Auth.form.error.email.taken'
      ) {
        setErrorUI('El email o el usuario ya estan en uso')
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

  const formSubmit = (e) => {
    e.preventDefault()
    signUp(form)
  }

  const changeField = (e) => {
    const { name, value } = e.target

    setForm({
      ...form,
      [name]: value
    })
  }

  return (
    <Login
      title="¡Hola! Completa el formulario para el registro"
      errorUI={errorUI}
    >
      <LoginForm onSubmit={formSubmit}>
        <LoginField
          fieldTitle="Email"
          inputName="email"
          inputOnChangeValue={changeField}
          inputValue={form.email}
          type="email"
          autoFocus
        />
        <LoginField
          fieldTitle="Usuario"
          inputName="username"
          inputOnChangeValue={changeField}
          inputValue={form.username}
        />
        <LoginField
          fieldTitle="Contraseña"
          inputName="password"
          inputOnChangeValue={changeField}
          inputValue={form.password}
          inputType="password"
        />
        <Button isLoading={isLoading} disabled={isLoading} type="submit">
          {isLoading ? <Loading /> : 'Registrarse'}
        </Button>
      </LoginForm>
      <Link href="/signin" passHref>
        <a href="/signin">
          <Button outline>Iniciar sesion</Button>
        </a>
      </Link>
    </Login>
  )
}

export const getServerSideProps = PublicRoute()
