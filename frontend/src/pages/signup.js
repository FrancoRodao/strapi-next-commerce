import { useCallback, useMemo, useState } from 'react'
import Link from 'next/link'
import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { PublicRoute } from '../routes/publicRoute'
import { useSignUp } from '../hooks/authHook'
import Login from '../components/Login/Login'
import LoginForm from '../components/Login/LoginForm'
import LoginField from '../components/Login/LoginField'
import { Button } from '../components/Button'
import { UploadIcon } from '../components/Icons/Upload'
import { useUpdateProfileImage } from '../hooks/profileHook'

const baseStyle = {
  position: 'relative',
  height: '300px',
  padding: '20px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  outline: 'none',
  transition: 'border .24s ease-in-out',
  cursor: 'pointer'
}

const focusedStyle = {
  borderColor: '#2196f3'
}

const acceptStyle = {
  borderColor: '#00e676'
}

const rejectStyle = {
  borderColor: '#ff1744'
}

const DropContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .button {
    width: fit-content;
    font-weight: 600;
    cursor: pointer;
    padding: 10px;
    border: none;
    background-color: transparent;
  }
`

const ImagePreviewContainer = styled.div`
  position: relative;
  height: 300px;
  border-radius: 50%;
  border: 3px solid #ebebeb;
  overflow: hidden;
`

const imageInitialState = {
  image: null,
  preview: null
}

function ImageStep() {
  const [imageState, setImageState] = useState(imageInitialState)
  const router = useRouter()

  const { updateProfileImage, isLoading } = useUpdateProfileImage({
    onSuccess: () => {
      toast.success('Registro exitoso!')
      router.push('/')
    }
  })

  const onDrop = useCallback((acceptedFiles) => {
    const acceptedImage = acceptedFiles[0]

    setImageState({
      image: acceptedImage,
      preview: Object.assign(acceptedImage, {
        src: URL.createObjectURL(acceptedImage)
      })
    })
  }, [])

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept: 'image/*',
      maxFiles: 1,
      maxSize: 5000000 // 5 mb
    })

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {})
    }),
    [isFocused, isDragAccept, isDragReject]
  )

  const handleSubmitForm = (e) => {
    e.preventDefault()

    if (imageState.image) {
      updateProfileImage({
        file: imageState.image
      })
    } else {
      toast.success('Registro exitoso!')
      router.push('/')
    }
  }

  return (
    <Login title="¿Quieres agregar una foto de perfil?">
      <form onSubmit={handleSubmitForm}>
        {imageState.preview ? (
          <ImagePreviewContainer>
            <Image
              layout="fill"
              objectFit="cover"
              src={imageState.preview.src}
              alt="preview"
            />
          </ImagePreviewContainer>
        ) : (
          /* eslint-disable react/jsx-props-no-spreading */
          <div {...getRootProps({ style })}>
            <input {...getInputProps()} />
            <DropContentContainer>
              <button type="button" className="button">
                <UploadIcon />
              </button>
              Sube tu foto!
            </DropContentContainer>
          </div>
        )}
        <Button
          style={{ marginTop: '20px' }}
          isLoading={isLoading}
          type="submit"
        >
          Agregar
        </Button>
        {imageState.preview ? (
          <Button
            style={{ marginTop: '20px', marginBottom: '15px' }}
            outline
            onClick={() => setImageState(imageInitialState)}
          >
            Cambiar foto
          </Button>
        ) : (
          <Button
            style={{ marginTop: '20px', marginBottom: '15px' }}
            type="submit"
            outline
          >
            Continuar
          </Button>
        )}
      </form>
    </Login>
  )
}

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
