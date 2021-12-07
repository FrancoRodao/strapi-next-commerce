import { ProtectedRoute } from '../routes/protectedRoute'

export default function Profile({ profile }) {
  return (
    <>
      <h1>perfil del usuario</h1>
      <h2>{profile.username}</h2>
    </>
  )
}

export const getServerSideProps = ProtectedRoute(async (context) => {
  const { req } = context

  return {
    props: {
      profile: JSON.parse(req.cookies.user)
    }
  }
})
