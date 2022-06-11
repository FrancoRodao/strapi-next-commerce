import styled from 'styled-components'
import toast from 'react-hot-toast'
import { useState } from 'react'
import { useGetMe } from '../../../hooks/authHook'
import { useChangeUserEmail } from '../../../hooks/profileHook'
import { useForm } from '../../../hooks/useForm'
import { Button } from '../../Button'
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

export function ChangeEmail() {
	const { formValues, handleInputChange } = useForm({
		email: '',
		confirmEmail: ''
	})

	const { data: me } = useGetMe()
	const { dispatch } = useModalContext()

	const [errorUI, setErrorUI] = useState(null)
	const { changeUserEmail, isLoading } = useChangeUserEmail({
		onSuccess: () => {
			toast.success('Email cambiado correctamente!')
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

		if (formValues.email === formValues.confirmEmail) {
			changeUserEmail({ email: formValues.email })
			setErrorUI(null)
			return
		}

		setErrorUI('Los emails deben ser iguales')
	}

	return (
		<ModalContentContainer onSubmit={handleSubmit}>
			{errorUI && <ErrorMessage>{errorUI}</ErrorMessage>}
			<ModalContentTitle>Email actual</ModalContentTitle>
			<ModalContentParagraph>{me?.email}</ModalContentParagraph>

			<ModalContentTitle>Nuevo email</ModalContentTitle>
			<Input type='email' onChange={handleInputChange} name='email' />

			<ModalContentTitle>Confirmar email</ModalContentTitle>
			<Input
				type='email'
				style={{ marginBottom: '35px' }}
				onChange={handleInputChange}
				name='confirmEmail'
			/>

			<ModalContentButtonBottom isLoading={isLoading} type='submit'>
				Cambiar email
			</ModalContentButtonBottom>
		</ModalContentContainer>
	)
}
