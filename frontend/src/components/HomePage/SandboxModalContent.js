import styled from 'styled-components'

const DataContainer = styled.div`
  display: flex;
  flex-direction: column;
`

const Paragraph = styled.p`
  margin-top: 10px;
  span {
    color: ${({ theme }) => theme.blue};
    font-weight: 600;
  }
`

export function SandboxModalContent() {
  return (
    <div style={{ marginTop: '10px' }}>
      <p>
        Este sitio se encuentra en modo de pruebas, para simular una compra con
        tarjeta a traves de paypal puedes utilizar los siguientes datos:
      </p>
      <DataContainer>
        <Paragraph>
          Card Type: <span>Visa Card</span>
        </Paragraph>
        <Paragraph>
          Number: <span>4032035431134923</span>
        </Paragraph>
        <Paragraph>
          Expiration Date: <span>01/2023</span>
        </Paragraph>
        <Paragraph>
          CVV: <span>596</span>
        </Paragraph>
      </DataContainer>
    </div>
  )
}
