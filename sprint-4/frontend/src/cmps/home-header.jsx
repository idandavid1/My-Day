import { Link } from 'react-router-dom'
const logo = require('../assets/img/monday-logo.webp')
export function HomeHeader() {

    return (
        <header className="home-header">
            <nav className='layout'>
                <img src={logo} alt="Logo"  />
                <Link to={'/board'}><button className='btn'>get start</button></Link> 
            </nav>
        </header>
    )
}