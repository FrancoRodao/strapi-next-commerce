import React from 'react'
import styled from 'styled-components'

const Form = styled.form`
	display: flex;
	flex-direction: column;
`

export default function LoginForm({ onSubmit, children }) {
	return (
		<Form className='form' onSubmit={onSubmit}>
			{children}
		</Form>
	)
}
