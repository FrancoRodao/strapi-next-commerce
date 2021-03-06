import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { PublicRoute } from '../routes/publicRoute'
import { useSignIn } from '../hooks/authHook'
import Login from '../components/Login/Login'
import LoginField from '../components/Login/LoginField'
import LoginForm from '../components/Login/LoginForm'
import { Button } from '../components/Button'

function SignIn() {
	const [errorUI, setErrorUI] = useState(null)

	const { signIn, isLoading } = useSignIn({
		onSuccess: (response) => {
			toast(
				<span>
					Bienvenido <b>{response.data.user.username}</b>
				</span>,
				{
					icon: '👋'
				}
			)
		},
		onError: (error) => {
			if (error.response.data.statusCode === 400) {
				setErrorUI('Credenciales invalidas')
				return
			}

			setErrorUI('Error inesperado, intente mas tarde')
		}
	})

	const formSubmit = (e) => {
		e.preventDefault()
		const userValue = e.target[0].value
		const passwordValue = e.target[1].value

		setErrorUI(null)
		signIn({
			username: userValue,
			password: passwordValue
		})
	}

	return (
		<Login
			title='¡Hola! Ingresa tus credenciales para iniciar sesión'
			errorUI={errorUI}
		>
			<LoginForm onSubmit={formSubmit}>
				<LoginField fieldTitle='Usuario' inputName='username' autoFocus />
				<LoginField
					fieldTitle='Contraseña'
					inputName='password'
					inputType='password'
				/>
				<Button
					style={{ marginBottom: '15px' }}
					isLoading={isLoading}
					disabled={isLoading}
					type='submit'
				>
					Ingresar
				</Button>
			</LoginForm>
			<Link href='/signup'>
				<a href='signup'>
					<Button outline>Crear cuenta</Button>
				</a>
			</Link>
		</Login>
	)
}

// If the user is logged in, they should not access the page
export const getServerSideProps = PublicRoute()

export default SignIn
