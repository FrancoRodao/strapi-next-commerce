import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  .bxs-error {
    color: ${({ theme }) => theme.error};
    margin-right: 5px;
  }

  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid ${({ theme }) => theme.error};
  background-color: ${({ theme }) => theme.bgError};
  text-align: center;
  padding: 10px;
  font-size: 18px;
  /* color: ${({ theme }) => theme.error}; */
`

export function ErrorMessage({ children }) {
  return (
    <Container>
      <i className="bx bxs-error" />
      <p>{children}</p>
    </Container>
  )
}
