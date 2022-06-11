import toast from 'react-hot-toast'
import { useState } from 'react'
import { useChangeUserPassword } from '../../../hooks/profileHook'
import { useForm } from '../../../hooks/useForm'
import { Input } from '../../Input'
import { useModalContext } from '../../../context/Modal/ModalContext'
import { types } from '../../../context/Modal/types'
import { ErrorMessage } from '../../ErrorMessage'
import {
	ModalContentButtonBottom,
	ModalContentContainer,
	ModalContentParagraph,
	ModalContentTitle
} from './ModalContentStyle'

export function ChangePassword() {
	const { formValues, handleInputChange } = useForm({
		password: '',
		confirmPassword: ''
	})

	const { dispatch } = useModalContext()

	const [errorUI, setErrorUI] = useState(null)
	const { changeUserPassword, isLoading } = useChangeUserPassword({
		onSuccess: () => {
			toast.success('Contraseña cambiada correctamente!')
			dispatch({ type: types.TOGGLE_MODAL })
		},
		onError: (error) => {
			if (error) {
				if (error.response?.status === 400) {
					setErrorUI(error.response?.data?.msg)
					return
				}

				setErrorUI('Error inesperado')
			}
		}
	})

	const handleSubmit = (e) => {
		e.preventDefault()

		if (formValues.password === formValues.confirmPassword) {
			changeUserPassword({ password: formValues.password })
			setErrorUI(null)
			return
		}

		setErrorUI('Las contraseñas deben ser iguales')
	}

	return (
		<ModalContentContainer onSubmit={handleSubmit}>
			{errorUI && <ErrorMessage>{errorUI}</ErrorMessage>}
			<ModalContentTitle>Contraseñá actual</ModalContentTitle>
			<ModalContentParagraph>********</ModalContentParagraph>

			<ModalContentTitle>Nueva contraseña</ModalContentTitle>
			<Input type='password' onChange={handleInputChange} name='password' />

			<ModalContentTitle>Confirmar contraseña</ModalContentTitle>
			<Input
				type='password'
				style={{ marginBottom: '35px' }}
				onChange={handleInputChange}
				name='confirmPassword'
			/>

			<ModalContentButtonBottom isLoading={isLoading} type='submit'>
				Cambiar contraseña
			</ModalContentButtonBottom>
		</ModalContentContainer>
	)
}
