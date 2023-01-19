import { Link } from 'react-router-dom'
const logo = require('../assets/img/monday-logo.webp')
export function HomeHeader({ boards }) {
    return (
        <header className="home-header">
            <nav className='layout'>
                <img src={logo} alt="Logo"  />
                <Link to={`/board/${boards[0]._id}`}><button className='btn'>Get started</button></Link> 
            </nav>
        </header>
    )
}