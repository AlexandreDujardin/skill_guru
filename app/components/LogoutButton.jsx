import { logout } from '../login/action'

export default function LogoutButton() {
  return (
    <form action={logout}>
          <button type="submit">
            Se déconnecter
          </button>
      </form>
  )
}