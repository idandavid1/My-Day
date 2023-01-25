import { Link } from 'react-router-dom'

const logo = require('../../assets/img/monday-logo.webp')

export function LoginPageHeader() {
    return (
        <header className="login-page-header">
            <Link to={'/'}> <img className='logo' src={logo} alt="" /> </Link>
        </header>
    )
}