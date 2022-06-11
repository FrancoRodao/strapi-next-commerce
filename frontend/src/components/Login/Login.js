import React from 'react'
import styled from 'styled-components'
import { ErrorMessage } from '../ErrorMessage'

const LoginContainer = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	min-height: inherit;

	.title {
		font-size: 20px;
		margin: 20px 0px;
	}

	.container {
		padding: 15px 55px;
		width: 400px;
		max-width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		background-color: #fff;
		margin: 50px auto;
	}
`

export default function Login({ title, errorUI, children }) {
	return (
		<LoginContainer>
			<div className='container'>
				{errorUI && <ErrorMessage>{errorUI}</ErrorMessage>}
				<h1 className='title'>{title}</h1>
				{children}
			</div>
		</LoginContainer>
	)
}
