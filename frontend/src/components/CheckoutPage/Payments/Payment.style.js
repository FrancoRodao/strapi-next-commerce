import styled from 'styled-components'

export const PaymentContainer = styled.div`
  position: sticky;
  top: 0;
  height: 100vh;
  padding: 56px 20px;
  width: 50%;
  overflow-y: auto;

  @media (max-width: 768px) {
    position: static;
    width: 100%;
    height: auto;
    overflow-y: unset;
    padding: 30px 20px;
  }

  @media (max-width: 425px) {
    padding: 30px 5px;
  }
`

export const PaymentTitle = styled.h1`
  font-size: 22px;
  font-weight: 500;
  margin-bottom: 30px;
`

export const PaymentOption = styled.p`
  font-weight: 500;
  margin-bottom: 5px;
`
