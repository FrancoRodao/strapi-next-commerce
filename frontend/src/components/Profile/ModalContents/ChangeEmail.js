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

const ChangeEmailContainer = styled.form`
  display: flex;
  flex-direction: column;
  min-height: 90%;
`

const Title = styled.h3`
  margin-top: 20px;
  margin-bottom: 10px;
`

const P = styled.p`
  margin-bottom: 10px;
`

const ButtonBottom = styled(Button)`
  margin-top: auto;
`

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
    <ChangeEmailContainer onSubmit={handleSubmit}>
      {errorUI && <ErrorMessage>{errorUI}</ErrorMessage>}
      <Title>Email actual</Title>
      <P>{me?.email}</P>

      <Title>Nuevo email</Title>
      <Input onChange={handleInputChange} name="email" />

      <Title>Confirmar email</Title>
      <Input
        style={{ marginBottom: '35px' }}
        onChange={handleInputChange}
        name="confirmEmail"
      />

      <ButtonBottom isLoading={isLoading} type="submit">
        Cambiar email
      </ButtonBottom>
    </ChangeEmailContainer>
  )
}
