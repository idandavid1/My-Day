import { Link } from 'react-router-dom'

const logo = require('../../assets/img/logo.png')

export function LoginPageHeader() {
    return (
        <header className="login-page-header">
            <Link to={'/'}> <img className='logo' src={logo} alt="" /> </Link>
        </header>
    )
}