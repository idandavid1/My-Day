import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../../store/user.actions"
import { BiLogIn } from 'react-icons/bi'
import { TbLogout } from 'react-icons/tb'
import { closeDynamicModal } from "../../store/board.actions"

export function LoginLogoutModal({ setIsLoginModalOpen }) {
    const user = useSelector(storeState => storeState.userModule.user)

    function onLogout() {
        setIsLoginModalOpen(false)
        closeDynamicModal()
        logout()
    }

    return <section className="login-logout-modal">
        {user && <span onClick={onLogout} ><TbLogout className="logout-icon" />Log out</span>}
        {!user && <Link to={'/auth/login'} ><span onClick={closeDynamicModal}>Log in<BiLogIn className="login-icon" /></span></Link>}
    </section>
}