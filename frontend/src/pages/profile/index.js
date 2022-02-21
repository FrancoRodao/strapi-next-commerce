import { dehydrate, QueryClient, useQueryClient } from 'react-query'
import styled from 'styled-components'
import Image from 'next/image'
import toast from 'react-hot-toast'
import { useRef, useState } from 'react'
import { AuthAPI } from '../../api/auth'
import { OrdersAPI } from '../../api/orders'
import { Button } from '../../components/Button'
import { OrderCard } from '../../components/Profile/OrderCard'
import { QueryKeys } from '../../constants/queryKeys.constant'
import { userIsAuthenticated } from '../../helpers/userIsAuthenticated'
import { useGetMe } from '../../hooks/authHook'
import { useGetUserOrders } from '../../hooks/ordersHook'
import { ProtectedRoute } from '../../routes/protectedRoute'
import { Modal } from '../../components/Modal'
import { ChangeEmail } from '../../components/Profile/ModalContents/ChangeEmail'
import { UploadIcon } from '../../components/Icons/Upload'
import { useUpdateProfileImage } from '../../hooks/profileHook'
import {
  ModalContextProvider,
  useModalContext
} from '../../context/Modal/ModalContext'
import { types } from '../../context/Modal/types'
import { ChangePassword } from '../../components/Profile/ModalContents/ChangePassword'
import { ChangeUsername } from '../../components/Profile/ModalContents/ChangeUsername'

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;

  .profile {
    display: flex;
    width: 80%;
    padding: 15px;
    margin: 20px;
    gap: 20px;
    background-color: white;
    border-radius: 3px;

    &__image {
      position: relative;
      width: 40%;
      height: 300px;
      border-radius: 50%;
      border: 3px solid #ebebeb;
      overflow: hidden;

      &--upload {
        position: absolute;
        top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 300px;
        border-color: transparent;
        border-radius: 50%;
        opacity: 0;
        background-color: rgba(255, 255, 255, 0.5);
        transition: opacity 0.5s, visibility 0.5s;
        cursor: pointer;

        &:hover {
          border-radius: 50%;
          opacity: 1;
        }
      }
    }

    &__info {
      width: 60%;
      padding: 0 10px;
    }

    &__username {
      text-align: center;
      margin-bottom: 20px;
    }

    &__item {
      position: relative;
      margin-bottom: 10px;
      padding: 10px 0;
      align-self: center;
      font-size: 17px;

      &--title {
        margin-bottom: 20px;
      }

      &--right {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: -webkit-box;
        text-overflow: ellipsis;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        word-break: break-word;
        overflow: hidden;
      }

      &--change {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translate(0, -50%);
      }

      &--button {
        font-weight: 600;
        cursor: pointer;
        padding: 10px;
      }
    }
  }

  .history {
    width: 100%;
  }

  .history__orders {
    height: 300px;
    margin: 20px;
    overflow-y: auto;
  }

  .history__title {
    text-align: center;
  }

  .history__none {
    text-align: center;
    font-size: 20px;
  }
`

function Profile() {
  const { dispatch } = useModalContext()
  const [modalInfo, setModalInfo] = useState({
    title: '',
    content: null
  })

  const inputFileRef = useRef()
  const queryClient = useQueryClient()

  const { data: me, isError: isError1 } = useGetMe()
  const { data: ordersData, isError: isError2 } = useGetUserOrders()
  const { updateProfileImage, isError: isError3 } = useUpdateProfileImage({
    onSuccess: (response) => {
      queryClient.setQueryData(QueryKeys.GET_ME, (old) => ({
        ...old,
        profileImageUrl: response.profileImageUrl
      }))
      toast.success('Imagen actualizada!')
    }
  })

  // TODO: IMPROVE IT
  if (isError1 || isError2 || isError3) {
    return <div>Fatal error :(</div>
  }

  const handleUpdateUserImage = () => {
    const input = inputFileRef.current
    input.click()
  }

  const handleInputFileChange = (e) => {
    const file = e.target.files[0]
    if (!file.type.includes('image/')) {
      toast.error('La foto de perfil debe ser una imagen')
      return
    }

    // 5 mb
    if (file.size > 5000000) {
      toast.error('La imagen no puede pesar mas de 5 mb')
      return
    }

    updateProfileImage({
      file
    })
  }

  const handleChangeEmail = () => {
    setModalInfo({
      title: 'Cambiar email',
      content: <ChangeEmail />
    })

    dispatch({ type: types.TOGGLE_MODAL })
  }

  const handleChangeUsername = () => {
    setModalInfo({
      title: 'Cambiar usuario',
      content: <ChangeUsername />
    })

    dispatch({ type: types.TOGGLE_MODAL })
  }

  const handleChangePassword = () => {
    setModalInfo({
      title: 'Cambiar contraseña',
      content: <ChangePassword />
    })

    dispatch({ type: types.TOGGLE_MODAL })
  }

  const handleAfterClose = () => {
    setModalInfo({
      title: '',
      content: null
    })
  }

  return (
    <Container>
      <Modal
        afterClose={handleAfterClose}
        title={modalInfo.title}
        content={modalInfo.content}
      />
      <div className="profile">
        <div className="profile__image">
          {me?.profileImageUrl && (
            <Image layout="fill" objectFit="cover" src={me?.profileImageUrl} />
          )}
          <input
            ref={inputFileRef}
            type="file"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleInputFileChange}
          />
          <button
            type="button"
            onClick={handleUpdateUserImage}
            className="profile__image--upload"
          >
            <UploadIcon />
          </button>
        </div>
        <div className="profile__info">
          <h1 className="profile__username">{me?.username}</h1>

          <h3 className="profile__item--title">Datos de cuenta</h3>
          <p className="profile__item">
            Email
            <span className="profile__item--right">{me?.email}</span>
            <span className="profile__item--change">
              <Button
                onClick={handleChangeEmail}
                outline
                className="profile__item--button"
                type="button"
              >
                Cambiar
              </Button>
            </span>
          </p>
          <p className="profile__item">
            Usuario
            <span className="profile__item--right">{me?.username}</span>
            <span className="profile__item--change">
              <Button
                onClick={handleChangeUsername}
                outline
                className="profile__item--button"
                type="button"
              >
                Cambiar
              </Button>
            </span>
          </p>
          <p className="profile__item">
            Contraseña
            <span className="profile__item--right">*********</span>
            <span className="profile__item--change">
              <Button
                onClick={handleChangePassword}
                outline
                className="profile__item--button"
                type="button"
              >
                Cambiar
              </Button>
            </span>
          </p>
        </div>
      </div>
      <div className="history">
        <h1 className="history__title">Historial de compras</h1>
        <div className="history__orders">
          {ordersData.length > 0 ? (
            ordersData?.map((order) => (
              <OrderCard
                key={order.id}
                orderId={order.id}
                products={order.productos}
              />
            ))
          ) : (
            <p className="history__none">Nada para mostrar...</p>
          )}
        </div>
      </div>
    </Container>
  )
}

export default function PageWithContext() {
  return (
    <ModalContextProvider>
      <Profile />
    </ModalContextProvider>
  )
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  const queryClient = new QueryClient()
  const { accessToken } = userIsAuthenticated(ctx)

  await queryClient.prefetchQuery(QueryKeys.GET_ME, () =>
    AuthAPI.getMe(accessToken)
  )
  await queryClient.prefetchQuery(QueryKeys.GET_USER_ORDERS, () =>
    OrdersAPI.getUserOrders(accessToken)
  )

  return {
    props: {
      dehydratedState: dehydrate(queryClient)
    }
  }
})
