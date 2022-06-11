import styled from 'styled-components'
import { Button } from '../../Button'

export const ModalContentContainer = styled.form`
	display: flex;
	flex-direction: column;
	min-height: 90%;
`

export const ModalContentTitle = styled.h3`
	margin-top: 20px;
	margin-bottom: 10px;
`

export const ModalContentParagraph = styled.p`
	margin-bottom: 10px;
`

export const ModalContentButtonBottom = styled(Button)`
	margin-top: auto;
`
