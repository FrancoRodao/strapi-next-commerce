import { useDropzone } from 'react-dropzone'
import styled from 'styled-components'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRouter } from 'next/router'
import { useCallback, useMemo, useState } from 'react'
import { useUpdateProfileImage } from '../../hooks/profileHook'
import { UploadIcon } from '../Icons/Upload'
import Login from './Login'
import { Button } from '../Button'

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

export function ImageStep() {
	const [imageState, setImageState] = useState(imageInitialState)
	const router = useRouter()

	const { updateProfileImage, isLoading } = useUpdateProfileImage()

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
		}

		toast.success('Registro exitoso!')
		router.push('/signin')
	}

	return (
		<Login title='¿Quieres agregar una foto de perfil?'>
			<form onSubmit={handleSubmitForm}>
				{imageState.preview ? (
					<ImagePreviewContainer>
						<Image
							layout='fill'
							objectFit='cover'
							src={imageState.preview.src}
							alt='preview'
						/>
					</ImagePreviewContainer>
				) : (
					/* eslint-disable react/jsx-props-no-spreading */
					<div {...getRootProps({ style })}>
						<input {...getInputProps()} />
						<DropContentContainer>
							<button type='button' className='button'>
								<UploadIcon />
							</button>
							Sube tu foto!
						</DropContentContainer>
					</div>
				)}
				<Button style={{ marginTop: '20px' }} isLoading={isLoading} type='submit'>
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
						type='submit'
						outline
					>
						Continuar
					</Button>
				)}
			</form>
		</Login>
	)
}
