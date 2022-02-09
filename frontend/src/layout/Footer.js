import styled from 'styled-components'

const Container = styled.div`
  background-color: ${({ theme }) => theme.navbarBgColor};
  display: flex;
  justify-content: space-around;
  padding: 5px;
`

export default function Footer() {
  return (
    <Container>
      <ul>
        <li>
          King Mobile
          <ul>
            <li>
              <a href="">kingmobilelegends@gmail.com</a>
            </li>
            <li>
              <a href="">26133445</a>
            </li>
            <li>
              <a href="">Rodeo del sur 5043</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          King Mobile
          <ul>
            <li>
              <a href="">kingmobilelegends@gmail.com</a>
            </li>
            <li>
              <a href="">26133445</a>
            </li>
            <li>
              <a href="">Rodeo del sur 5043</a>
            </li>
          </ul>
        </li>
      </ul>
      <ul>
        <li>
          King Mobile
          <ul>
            <li>
              <a href="">kingmobilelegends@gmail.com</a>
            </li>
            <li>
              <a href="">26133445</a>
            </li>
            <li>
              <a href="">Rodeo del sur 5043</a>
            </li>
          </ul>
        </li>
      </ul>
    </Container>
  )
}
