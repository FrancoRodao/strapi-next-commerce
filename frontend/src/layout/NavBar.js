import Image from 'next/image'
import Link from 'next/link'
import styled from 'styled-components'
import { useUserContext } from '../context/User/UserContext'

const Header = styled.header`
  width: 100%;
  height: 4.5rem;
  background-color: ${({ theme }) => `${theme.navbarBgColor}`};

  /*ICONS*/
  .bx-user,
  .bx-cart {
    font-size: 19px !important;
  }
  .bx-search {
    font-size: 21px !important;
  }
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  height: 100%;

  .logo {
    height: 100%;
    display: flex;
    align-items: center;

    &-img-container {
      /*because next/img has position: absolute*/
      position: relative;
      height: 100%;
      width: 105px;
      clip-path: circle(50%);

      &:hover {
        animation: shake 5s cubic-bezier(0.36, 0.07, 0.19, 0.97);
      }
    }
  }

  @keyframes shake {
    0%,
    2%,
    4%,
    6%,
    8%,
    10%,
    12%,
    14%,
    16%,
    18% {
      transform: translate3d(-1px, 0, 0) rotate(-10deg);
    }
    1%,
    3%,
    5%,
    7%,
    9%,
    11%,
    13%,
    15%,
    17%,
    19% {
      transform: translate3d(1px, 0, 0) rotate(10deg);
    }
    20%,
    100% {
      transform: translate3d(0, 0, 0) rotate(0deg);
    }
  }

  .img {
    cursor: pointer;
  }

  .title {
    font-size: 18px;
    font-weight: 700;
    font-style: italic;
  }
`

const Button = styled.button`
  border: transparent;
  background-color: transparent;
  cursor: pointer;

  .item {
    margin-right: 10px;
    cursor: pointer;
  }
`

const SearchForm = styled.form`
  position: relative;
  display: flex;
  height: 60%;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border: 0 rgba(0, 0, 0, 0.2);

  .input {
    padding: 10px;
    width: 19rem;
    border: transparent;
  }

  .icon_container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 50px;
    background-color: #fff;

    &::before {
      content: '';
      border-left: 1px solid gray;
      margin-right: 3px;
      height: 25px;
    }
  }
`

const Menu = styled.div`
  display: flex;
  align-items: center;

  .item {
    margin-right: 10px;
    cursor: pointer;
  }
`

export default function NavBar() {
  const { state } = useUserContext()
  const { isAuthenticated, data: userData } = state

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('not implemented')
  }

  return (
    <Header>
      <Nav>
        <div className="logo">
          <Link href="/" passHref>
            <a href="ignore" className="logo-img-container">
              {' '}
              <Image
                className="img"
                alt="logo"
                src="/MobileKing.png"
                layout="fill"
                objectFit="cover"
                objectPosition="0px -20px"
              />
            </a>
          </Link>

          <h1 className="title">Líder en celulares</h1>
        </div>

        <SearchForm onSubmit={handleSubmit}>
          <input
            placeholder="Buscar productos..."
            className="input"
            type="text"
          />
          <div className="icon_container">
            <Button type="submit">
              <i className="bx bx-search" />
            </Button>
          </div>
        </SearchForm>

        <Menu>
          <Button className="item">
            {isAuthenticated ? (
              <Link href="/profile" passHref>
                <a href="ignore">
                  <i className="bx bx-user" />
                </a>
              </Link>
            ) : (
              <Link href="/login" passHref>
                <a href="ignore">
                  <p>Iniciar sesion</p>
                </a>
              </Link>
            )}
          </Button>
          <p className="item">{userData?.username}</p>

          <Button className="item">
            {isAuthenticated ? (
              <Link href="/cart" passHref>
                <a href="ignore">
                  <i className="bx bx-cart" />
                </a>
              </Link>
            ) : (
              <Link href="/signup" passHref>
                <a href="ignore">
                  <p>Registarse</p>
                </a>
              </Link>
            )}
          </Button>
        </Menu>
      </Nav>
    </Header>
  )
}
