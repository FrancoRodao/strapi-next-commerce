import React from 'react'
import styled from 'styled-components'

const FormTitle = styled.p`
  margin-bottom: 5px;
`

const FormInput = styled.input`
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

export default function LoginField({
  fieldTitle,
  inputName,
  inputValue,
  inputOnChangeValue,
  inputType
}) {
  return (
    <>
      <FormTitle>{fieldTitle}</FormTitle>
      <FormInput
        name={inputName}
        value={inputValue}
        type={inputType || 'text'}
        onChange={inputOnChangeValue}
        className="form__input"
        // eslint-disable-next-line jsx-a11y/no-autofocus
        autoFocus
        required
      />
    </>
  )
}
