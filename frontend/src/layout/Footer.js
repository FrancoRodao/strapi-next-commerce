import styled from 'styled-components'

const MainContainer = styled.div`
  background-color: ${({ theme }) => theme.navbarBgColor};
  text-align: center;
  padding: 15px;
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;

  ul {
    margin: 15px;
  }
`

const Paragraph = styled.p`
  margin-top: 15px;
`

export default function Footer() {
  return (
    <MainContainer>
      King Mobile
      <Container>
        <ul>
          <li>
            <Paragraph>kingmobilelegends@gmail.com</Paragraph>
          </li>
          <li>
            <Paragraph>26133445</Paragraph>
          </li>
          <li>
            <Paragraph>Rodeo del sur 5043</Paragraph>
          </li>
        </ul>
        <ul>
          <li>
            <Paragraph>kingmobilelegends@gmail.com</Paragraph>
          </li>
          <li>
            <Paragraph>26133445</Paragraph>
          </li>
          <li>
            <Paragraph>Rodeo del sur 5043</Paragraph>
          </li>
        </ul>
        <ul>
          <li>
            <Paragraph>kingmobilelegends@gmail.com</Paragraph>
          </li>
          <li>
            <Paragraph>26133445</Paragraph>
          </li>
          <li>
            <Paragraph>Rodeo del sur 5043</Paragraph>
          </li>
        </ul>
      </Container>
    </MainContainer>
  )
}
