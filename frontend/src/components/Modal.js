import styled, { css } from 'styled-components'
import { useModalContext } from '../context/Modal/ModalContext'
import { types } from '../context/Modal/types'
import { CloseIcon } from './Icons/Close'
import { Portal } from './Portal'

const MODAL_TRANSITION_TIME_MS = 500 // 0.5 seconds

const ModalContainer = styled.div`
  ${({ isOpen }) =>
    isOpen
      ? css`
          opacity: 1;
          visibility: visible;
        `
      : css`
          opacity: 0;
          visibility: hidden;
        `}
  transition: opacity ${MODAL_TRANSITION_TIME_MS}ms, visibility ${MODAL_TRANSITION_TIME_MS}ms;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0;
  right: 0;
  left: 0;
  top: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.3);
`

const ModalContentContainer = styled.div`
  overflow: auto;
  border-radius: 5px;
  background-color: #fff;
  width: 70%;
  height: 90%;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;

    &__close {
      border: none;
      background-color: transparent;
      color: rgb(227, 38, 54);
      cursor: pointer;
      transition: color 0.5s;

      &:hover {
        color: rgb(255, 0, 0);
      }
    }
  }

  .hr {
    border: 0;
    height: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
  }
`

export function Modal({ title, content, afterClose }) {
  const { state, toggleModal } = useModalContext()

  const close = () => {
    toggleModal()

    if (afterClose) {
      setTimeout(() => {
        afterClose()
      }, MODAL_TRANSITION_TIME_MS)
    }
  }

  return (
    <Portal selectorId="app-modal">
      <ModalContainer onClick={toggleModal} isOpen={state.opened}>
        <ModalContentContainer onClick={(e) => e.stopPropagation()}>
          <div className="header">
            <h1>{title}</h1>
            <button onClick={close} className="header__close" type="button">
              <CloseIcon />
            </button>
          </div>
          <hr className="hr" />
          {content}
        </ModalContentContainer>
      </ModalContainer>
    </Portal>
  )
}
