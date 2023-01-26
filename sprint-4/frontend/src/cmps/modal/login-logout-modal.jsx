import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { logout } from "../../store/user.actions"
import { BiLogIn } from 'react-icons/bi'
import { TbLogout } from 'react-icons/tb'

export function LoginLogoutModal() {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()

    return <section className="login-logout-modal">
        <ul>
            {user ? <li onClick={() => logout()}><TbLogout className="logout-icon"/>Log out</li>
                : <li onClick={() => navigate(`/auth/login`)}><BiLogIn className="login-icon"/>Log in</li>}
        </ul>
    </section>
}