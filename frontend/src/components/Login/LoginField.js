import React from 'react'
import styled from 'styled-components'
import { Input } from '../Input'

const FormTitle = styled.p`
	margin-bottom: 5px;
`

export default function LoginField({
	fieldTitle,
	inputName,
	inputValue,
	inputOnChangeValue,
	inputType,
	...rest
}) {
	return (
		<>
			<FormTitle>{fieldTitle}</FormTitle>
			<Input
				name={inputName}
				value={inputValue}
				type={inputType || 'text'}
				onChange={inputOnChangeValue}
				// eslint-disable-next-line jsx-a11y/no-autofocus
				required
				// eslint-disable-next-line react/jsx-props-no-spreading
				{...rest}
			/>
		</>
	)
}
