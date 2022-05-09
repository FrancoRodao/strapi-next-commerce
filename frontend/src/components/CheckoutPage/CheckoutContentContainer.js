import styled from 'styled-components'

const Container = styled.div`
  display: ${({ isLoading }) => (isLoading ? 'none' : 'flex')};

  @media (max-width: 768px) {
    flex-direction: column;
  }
`

export function CheckoutContentContainer({ children, isLoading }) {
  return <Container isLoading={isLoading}>{children}</Container>
}
