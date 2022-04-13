import styled from 'styled-components'

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Paragraph = styled.p`
  margin-top: 10px;
`

export function SandboxModalContent() {
  return (
    <div style={{ marginTop: '10px' }}>
      <p>
        Este sitio se encuentra en modo de pruebas, para simular una compra con
        tarjeta a traves de paypal puedes utilizar los siguientes datos:
      </p>
      <DataContainer>
        <Paragraph>Card Type: Visa Card</Paragraph>{' '}
        <Paragraph>Number: 4032035431134923</Paragraph>
        <Paragraph>Expiration Date: 01/2023</Paragraph>
        <Paragraph>CVV: 596</Paragraph>
      </DataContainer>
    </div>
  )
}
