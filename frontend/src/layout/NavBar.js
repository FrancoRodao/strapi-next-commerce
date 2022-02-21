/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { CartIcon } from '../components/Icons/Cart'
import { ChevronIcon } from '../components/Icons/Chevron'
import { SearchIcon } from '../components/Icons/Search'
import { UserIcon } from '../components/Icons/User'
import { useGetMe, useLogout } from '../hooks/authHook'

const Header = styled.header`
  width: 100%;
  height: 4.5rem;
  background-color: ${({ theme }) => `${theme.navbarBgColor}`};
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
      user-select: none;

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

  &__search {
    margin-top: 2px;
  }

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
      margin-right: 8px;
      height: 25px;
    }
  }
`

const Menu = styled.div`
  display: flex;
  align-items: center;

  .menu__item {
    font-size: 18px;
    margin-left: 8px;
    cursor: pointer;

    &--chevron {
      position: relative;
      margin-top: 3px;

      &::before {
        content: '';
        visibility: hidden;
        opacity: 0;
        position: absolute;
        top: 90%;
        left: 50%;
        transform: translate(-50%, 0);
        pointer-events: none;
        border-bottom: 14px solid #fff;
        border-left: 14px solid transparent;
        border-right: 14px solid transparent;
        transition: visibility 0.2s, opacity 0.2s;
      }
    }

    &--icon {
      transition: transform 0.2s;
    }

    &--login {
      font-size: 16px;
    }

    &--cart {
      margin-left: 20px;
    }

    &--profileinfo {
      padding-top: 12px;
      padding-bottom: 12px;
      width: 100%;
      height: 100%;
      text-align: center;

      :hover {
        background-color: ${({ theme }) => theme.lightGrey};
      }
    }

    &--button {
      border: none;
      background-color: transparent;
      cursor: pointer;
    }
  }

  .menu__profileinfo {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: 45px;
    left: -60%;
    width: 270px;
    background-color: #fff;
    z-index: 9999;
    transition: visibility 0.2s, opacity 0.2s;
  }

  .menu__profile {
    display: flex;
    align-items: center;
    position: relative;
    height: 45px;
    cursor: pointer;

    &:hover .menu__item--icon {
      transform: rotate(180deg);
    }

    &:hover .menu__profileinfo,
    &:hover .menu__item--chevron::before {
      visibility: visible;
      opacity: 1;
    }
  }
`

export default function NavBar() {
  const { data: me } = useGetMe()
  const { logout } = useLogout()
  const router = useRouter()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('not implemented')
  }

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <Header>
      <Nav>
        <div className="logo">
          <Link href="/" passHref>
            <a href="/" className="logo-img-container">
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
              <SearchIcon style={{ marginTop: '3px' }} />
            </Button>
          </div>
        </SearchForm>

        <Menu>
          {me ? (
            <div className="menu__profile">
              <UserIcon />
              <p className="menu__item">{me.username}</p>
              <div className="menu__item--chevron">
                <ChevronIcon className="menu__item--icon" />
              </div>
              <div className="menu__profileinfo">
                <Link href="/profile" passHref>
                  <a className="menu__item--profileinfo" href="profile">
                    Perfil
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="menu__item--profileinfo menu__item--button"
                >
                  Salir
                </button>
              </div>
            </div>
          ) : (
            <Link href="/signin" passHref>
              <a href="/signin">
                <p className="menu__item menu__item--login">Iniciar sesión</p>
              </a>
            </Link>
          )}

          <Button>
            {me ? (
              <Link href="/cart" passHref>
                <a href="cart">
                  <CartIcon
                    className="menu__item"
                    style={{ marginTop: '3px' }}
                  />
                </a>
              </Link>
            ) : (
              <Link href="/signup" passHref>
                <a href="signup">
                  <p className="menu__item menu__item--login">Registrase</p>
                </a>
              </Link>
            )}
          </Button>
        </Menu>
      </Nav>
    </Header>
  )
}
