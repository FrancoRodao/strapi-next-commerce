import React from 'react'
import styled from 'styled-components'
import { ErrorIcon } from './Icons/Error'

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.error};
  background-color: ${({ theme }) => theme.bgError};
  text-align: center;
  padding: 10px;
  font-size: 18px;

  .p {
    margin-left: 5px;
  }
`

export function ErrorMessage({ children }) {
  return (
    <Container>
      <ErrorIcon />
      <p className="p">{children}</p>
    </Container>
  )
}
