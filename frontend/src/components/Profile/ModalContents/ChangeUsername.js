import toast from 'react-hot-toast'
import { useState } from 'react'
import { useChangeUserUsername } from '../../../hooks/profileHook'
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
import { useGetMe } from '../../../hooks/authHook'

export function ChangeUsername() {
  const { formValues, handleInputChange } = useForm({
    username: '',
    confirmUsername: ''
  })

  const { dispatch } = useModalContext()
  const { data: me } = useGetMe()

  const [errorUI, setErrorUI] = useState(null)
  const { changeUserUsername, isLoading } = useChangeUserUsername({
    onSuccess: () => {
      toast.success('Nombre de usuario cambiado correctamente!')
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
    if (formValues.username === formValues.confirmUsername) {
      changeUserUsername({ username: formValues.username })
      setErrorUI(null)
      return
    }

    setErrorUI('Los usuarios deben ser iguales')
  }

  return (
    <ModalContentContainer onSubmit={handleSubmit}>
      {errorUI && <ErrorMessage>{errorUI}</ErrorMessage>}
      <ModalContentTitle>Usuario actual</ModalContentTitle>
      <ModalContentParagraph>{me?.username}</ModalContentParagraph>

      <ModalContentTitle>Nuevo usuario</ModalContentTitle>
      <Input name="username" onChange={handleInputChange} />

      <ModalContentTitle>Confirmar usuario</ModalContentTitle>
      <Input
        style={{ marginBottom: '35px' }}
        onChange={handleInputChange}
        name="confirmUsername"
      />

      <ModalContentButtonBottom isLoading={isLoading} type="submit">
        Cambiar usuario
      </ModalContentButtonBottom>
    </ModalContentContainer>
  )
}
