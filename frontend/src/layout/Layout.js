import styled from 'styled-components'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import Footer from './Footer'

const Container = styled.div`
  min-height: ${({ theme }) => `calc(100vh - ${theme.navbarHeight})`};
  background-color: ${({ theme }) => theme.backgroundGreyLight};
`

export default function Layout({ children }) {
  return (
    <>
      <NavBar />
      <Container>{children}</Container>
      <Footer />
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired
}
