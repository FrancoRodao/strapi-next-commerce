import React from 'react'
import styled, { css } from 'styled-components'
import Loading from './Loading'

const ButtonStyle = styled.button`
  width: 100%;
  border-color: transparent;
  padding: ${({ isLoading }) => (!isLoading ? '15px' : '0px')};
  border-radius: 5px;
  background-color: ${({ theme, outline }) => (outline ? '#fff' : theme.blue)};
  color: ${({ theme, outline }) => (outline ? theme.blue : '#fff')};
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ theme, outline }) =>
      outline ? '#ceddf2' : theme.darkBlue};
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      background-color: ${({ theme }) => theme.borderGreylight};

      &:hover {
        background-color: ${({ theme }) => theme.borderGreylight};
      }
    `}
`

export function Button({
  isLoading = false,
  type = 'button',
  outline = false,
  children,
  ...rest
}) {
  return (
    <ButtonStyle
      type={type}
      isLoading={isLoading}
      disabled={isLoading}
      outline={outline}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
    >
      {isLoading ? <Loading fontSize={13} /> : children}
    </ButtonStyle>
  )
}
