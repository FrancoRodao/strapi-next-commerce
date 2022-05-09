import { dehydrate, QueryClient } from 'react-query'
import styled from 'styled-components'
import { OrdersAPI } from '../../../api/orders'
import { CheckIcon } from '../../../components/Icons/Check'
import { QueryKeys } from '../../../constants/queryKeys.constant'
import { userIsAuthenticated } from '../../../helpers/userIsAuthenticated'
import { useGetUserOrder } from '../../../hooks/ordersHook'
import { ProtectedRoute } from '../../../routes/protectedRoute'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: inherit;
`

const Card = styled.div`
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 3px #c8d0d8;
  margin: 15px auto;
  height: 100%;
  width: 500px;
  position: relative;
  overflow: hidden;

  .text-left {
    text-align: left;
  }

  .delivered {
    position: absolute;
    top: 28px;
    left: -47px;
    transform: rotate(-45deg);
    text-align: center;
    padding: 15px;
    width: 200px;
    color: ${({ theme }) => theme.lightGrey};
    font-size: 18px;
    box-shadow: 0 2px 3px #c8d0d8;

    &__yes {
      background-color: ${({ theme }) => theme.success};
    }

    &__not {
      background-color: ${({ theme }) => theme.error};
    }
  }

  .content {
    padding: 60px;
  }

  .content__icon {
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 200px;
    height: 200px;
    width: 200px;
    background-color: #f8faf5;
    margin: 0 auto;

    &--check {
      color: #9abc66;
      font-size: 100px;
    }
  }

  .content__title {
    color: #88b04b;
    font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
    font-weight: 900;
    font-size: 40px;
    margin: 10px 0px;
    text-align: center;
  }

  .content__text {
    color: #404f5e;
    font-family: 'Nunito Sans', 'Helvetica Neue', sans-serif;
    font-size: 20px;
    margin: 0;
    text-align: center;

    &--strong {
      font-weight: 600;
      margin: 0 4px;
      color: #323232;
    }

    &--right {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      color: ${({ theme }) => theme.blue};
      font-weight: 600;
    }
  }

  .products {
    padding: 15px;

    &__hr {
      border: 0;
      height: 0;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    }

    &__text {
      display: flex;
      justify-content: space-between;
      gap: 10px;
      margin: 15px 0;
      position: relative;

      &--quantity {
        color: ${({ theme }) => theme.blue};
        font-weight: 600;
        margin-right: 5px;
      }
    }
  }

  @media (max-width: 768px) {
    .content {
      padding: 30px;
    }
  }
`

export default function Order({ orderId }) {
  const { data: order, isLoading } = useGetUserOrder(orderId)

  const products = order?.productos
  const total = order?.total
  const name = order?.info_de_pago?.nombre_de_pago
  const surname = order?.info_de_pago?.apellido_de_pago
  const email = order?.info_de_pago?.correo_de_pago
  const paymentMethod = order?.info_de_pago?.metodo_de_pago

  return (
    <>
      {!isLoading && order && (
        <Container>
          <Card>
            <span
              className={`delivered ${
                order.entregado ? 'delivered__yes' : 'delivered__not'
              }`}
            >
              {order.entregado ? 'Entregado' : 'No entregado'}
            </span>
            <div className="content">
              <div className="content__icon">
                <CheckIcon />
              </div>
              <h1 className="content__title">Éxito</h1>
              <p className="content__text">
                Recibimos su solicitud de compra, con el
                <span className="content__text--strong">
                  identificador de compra
                </span>
                y su<span className="content__text--strong">correo</span>lo
                puede retirar estaremos en contacto en breve!
              </p>
            </div>

            <div className="products">
              {products?.map((productData) => (
                <p key={productData.id} className="products__text">
                  <div>
                    <span className="products__text--quantity">
                      x{productData.cantidad}
                    </span>
                    {productData.producto.titulo}
                  </div>
                  <span className="content__text--right">
                    USD {productData.precio_de_compra}
                  </span>
                </p>
              ))}
              <hr className="products__hr" />
              <p className="products__text">
                Total <span className="content__text--right">USD {total}</span>
              </p>

              <div>
                <p className="products__text">
                  Identificador de compra
                  <span className="content__text--right">{orderId}</span>
                </p>
                <p className="products__text">
                  Nombre
                  <span className="content__text--right">{name}</span>
                </p>
                <p className="products__text">
                  Apellido
                  <span className="content__text--right">{surname}</span>
                </p>
                <p className="products__text">
                  Correo <span className="content__text--right">{email}</span>
                  {/* <span className="content__text--right">{email}</span> */}
                </p>
                <p className="products__text">
                  Método de pago
                  <span className="content__text--right">{paymentMethod}</span>
                </p>
              </div>
            </div>
          </Card>
        </Container>
      )}
    </>
  )
}

export const getServerSideProps = ProtectedRoute(async (ctx) => {
  const { orderId } = ctx.params
  const { accessToken } = userIsAuthenticated(ctx)
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery(QueryKeys.GET_USER_ORDER, () =>
    OrdersAPI.getUserOrder(orderId, accessToken)
  )

  return {
    props: {
      orderId,
      dehydratedState: dehydrate(queryClient)
    }
  }
})
