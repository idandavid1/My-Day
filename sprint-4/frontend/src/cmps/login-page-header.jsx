
const logo = require('../assets/img/monday-logo.webp')
export function LoginPageHeader() {
    return (
        <header className="login-page-header">
            <img src={logo} alt="Logo" />
        </header>
    )
}