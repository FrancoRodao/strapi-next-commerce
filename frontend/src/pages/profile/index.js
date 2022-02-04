import { useUserContext } from '../../context/User/UserContext'
import { ProtectedRoute } from '../../routes/protectedRoute'

export default function Profile() {
  const { state } = useUserContext()

  console.log(state)

  return (
    <>
      <h1>perfil del usuario</h1>
      <h2>{state.data.username}</h2>
    </>
  )
}

export const getServerSideProps = ProtectedRoute()
