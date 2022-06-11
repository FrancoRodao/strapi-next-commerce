import styled from 'styled-components'

const InputStyle = styled.input`
	padding: 10px;
	box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.25);
	border-radius: 5px;
	margin-bottom: 15px;
	outline: none;
	border-color: transparent;

	&:focus {
		box-shadow: 0 0 0 0.125em #3483fa;
	}
`

export function Input({ value, name, onChange, placeholder, ...rest }) {
	return (
		<InputStyle
			value={value}
			name={name}
			onChange={onChange}
			placeholder={placeholder}
			{...rest}
		/>
	)
}
