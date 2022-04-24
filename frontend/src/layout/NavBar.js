/* eslint-disable @next/next/no-html-link-for-pages */
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { CartIcon } from '../components/Icons/Cart'
import { ChevronIcon } from '../components/Icons/Chevron'
import { SearchIcon } from '../components/Icons/Search'
import { UserIcon } from '../components/Icons/User'
import { isClientSide } from '../helpers/isClientSide'
import { useGetMe, useLogout } from '../hooks/authHook'
import { useForm } from '../hooks/useForm'

const MAX_PX_WIDTH_HAMBURGER_MENU = 768

const Header = styled.header`
  position: relative;
  width: 100%;
  height: 4.5rem;
  background-color: ${({ theme }) => `${theme.navbarBgColor}`};

  .btn {
    border: none;
    background-color: transparent;
    cursor: pointer;
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

    &__anchor {
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

    &__image {
      cursor: pointer;
    }

    &__title {
      font-size: 18px;
      font-weight: 700;
      font-style: italic;
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

  .hamburger {
    display: none;
    opacity: 0.7;

    &__bar {
      display: block;
      width: 25px;
      height: 2px;
      margin: 5px auto;
      -webkit-transition: all 0.3s ease-in-out;
      transition: all 0.3s ease-in-out;
      background-color: #101010;
    }
  }

  .menu__item {
    margin-left: 20px;
    max-width: 150px;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  @media (max-width: 900px) {
    .logo__title {
      display: none;
    }
  }

  @media (max-width: ${MAX_PX_WIDTH_HAMBURGER_MENU}px) {
    .hamburger {
      display: block;

      &.active .hamburger__bar:nth-child(2) {
        opacity: 0;
      }
      &.active .hamburger__bar:nth-child(1) {
        transform: translate(0, 8px) rotate(45deg);
      }
      &.hamburger.active .hamburger__bar:nth-child(3) {
        transform: translate(0, -6px) rotate(-45deg);
      }
    }

    .menu-active {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 100%;
      left: 0;
      z-index: 1;
      width: 100%;
      background-color: #fff;
    }

    .menu-active > .menu__item--login {
      display: block;
      margin-top: 10px;
      margin-left: 0;
    }
  }

  @media (max-width: 500px) {
    padding: 0;
    margin-right: 5px;
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

  @media (max-width: 500px) {
    margin-right: 15px;
  }
`

const SearchForm = styled.form`
  position: relative;
  display: flex;
  height: 60%;
  margin: 0 30px;
  flex-grow: 2;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  border: 0 rgba(0, 0, 0, 0.2);

  .search__input {
    width: 100%;
    padding: 10px;
    border: transparent;
  }

  .search__iconContainer {
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

  @media (max-width: 500px) {
    margin: 0;
    margin-right: 15px;
  }
`

const Menu = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  height: 45px;
  cursor: pointer;

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
        top: 110%;
        left: 30%;
        transform: translate(-50%, 0);
        pointer-events: none;
        width: 10px;
        height: 10px;
        transform: rotate(45deg);
        background-color: #fff;
        z-index: 2;
        border-top: solid 1px #e5d850;
        border-left: solid 1px #e5d850;
        transition: visibility 0.2s, opacity 0.2s;
      }
    }

    &--icon {
      transition: transform 0.2s;
    }

    &--login {
      display: inline-block;
      margin-left: 8px;
      cursor: pointer;
      font-size: 16px;
    }

    &--cart {
      margin-left: 20px;
    }

    &--profile {
      padding: 12px 0;
      margin-top: 8px;
      width: 100%;
      height: 100%;
      text-align: center;

      :hover {
        background-color: ${({ theme }) => theme.lightGrey};
      }
    }
  }

  .menu__profile {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    visibility: hidden;
    opacity: 0;
    top: 45px;
    right: -20px;
    width: 270px;
    background-color: #fff;
    border: solid 1px #e5d850;
    z-index: 1;
    transition: visibility 0.2s, opacity 0.2s;
  }

  &:hover .menu__item--icon {
    transform: rotate(180deg);
  }

  &:hover .menu__profile,
  &:hover .menu__item--chevron::before {
    visibility: visible;
    opacity: 1;
  }

  @media (max-width: 768px) {
    display: none;
    height: 150px;

    .menu__container {
      position: relative;
      height: 100%;
    }

    .menu__profile {
      visibility: visible;
      opacity: 1;
      position: absolute;
      width: 100%;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: none;
    }

    .menu__profile--icon,
    .menu__item,
    .menu__item--chevron {
      display: none;
    }
  }
`

export default function NavBar() {
  const { data: me } = useGetMe()
  const { logout } = useLogout()
  const router = useRouter()

  const hamburgerMenuRef = useRef()
  const [isHamburgerMenuOn, setIsHamburgerMenuOn] = useState(false)

  const { formValues, handleInputChange } = useForm({
    search: router.query.q || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (formValues.search.length > 0) {
      router.push(`/search?q=${formValues.search}`)
    }
  }

  const handleLogout = (e) => {
    e.preventDefault()
    logout()
    router.push('/')
  }

  const handleToggleHamburger = () => {
    hamburgerMenuRef.current.classList.toggle('active')
    hamburgerMenuRef.current.previousSibling.classList.toggle('menu-active')
  }

  // close the menu after clicking on some menu item
  useEffect(() => {
    const resizeListener = () => {
      if (window.innerWidth <= MAX_PX_WIDTH_HAMBURGER_MENU) {
        setIsHamburgerMenuOn(true)
        return
      }
      setIsHamburgerMenuOn(false)
    }

    if (isClientSide()) {
      resizeListener()

      window.addEventListener('resize', resizeListener)
    }

    return () =>
      isClientSide() && window.removeEventListener('resize', resizeListener)
  }, [])

  return (
    <Header>
      <Nav>
        <div className="logo">
          <Link href="/">
            <a href="/" className="logo__anchor">
              <Image
                className="logo__image"
                alt="logo"
                src="/MobileKing.png"
                layout="fill"
                objectFit="cover"
                objectPosition="0px -20px"
              />
            </a>
          </Link>

          <h1 className="logo__title">Líder en celulares</h1>
        </div>

        <SearchForm onSubmit={handleSubmit}>
          <input
            autoComplete="off"
            placeholder="Buscar productos..."
            className="search__input"
            type="search"
            name="search"
            value={formValues.search}
            onChange={handleInputChange}
            required
          />
          <div className="search__iconContainer">
            <Button type="submit">
              <SearchIcon style={{ marginTop: '3px' }} />
            </Button>
          </div>
        </SearchForm>

        <Menu>
          {me ? (
            <>
              <UserIcon />
              <p className="menu__item">{me.username}</p>
              <div className="menu__item--chevron">
                <ChevronIcon className="menu__item--icon" />
              </div>
              <div className="menu__profile">
                <Link href="/profile" passHref>
                  <a
                    onClick={isHamburgerMenuOn && handleToggleHamburger}
                    className="menu__item--profile"
                    href="profile"
                  >
                    Perfil
                  </a>
                </Link>
                <button
                  type="button"
                  onClick={(e) => {
                    if (isHamburgerMenuOn) handleToggleHamburger()
                    handleLogout(e)
                  }}
                  className="menu__item--profile btn"
                >
                  Salir
                </button>
              </div>
            </>
          ) : (
            <>
              <Link href="/signin" passHref>
                <a
                  className="menu__item--login"
                  href="/signin"
                  onClick={isHamburgerMenuOn && handleToggleHamburger}
                >
                  Iniciar sesión
                </a>
              </Link>
              <Link href="/signup" passHref>
                <a
                  className="menu__item--login"
                  href="signup"
                  onClick={isHamburgerMenuOn && handleToggleHamburger}
                >
                  Registrase
                </a>
              </Link>
            </>
          )}
        </Menu>

        <button
          className="hamburger btn"
          ref={hamburgerMenuRef}
          onClick={handleToggleHamburger}
          type="button"
        >
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
          <span className="hamburger__bar" />
        </button>

        {me && (
          <Button>
            <Link href="/cart" passHref>
              <a href="cart">
                <CartIcon className="menu__item" style={{ marginTop: '2px' }} />
              </a>
            </Link>
          </Button>
        )}
      </Nav>
    </Header>
  )
}
