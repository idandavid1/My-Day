import { Link } from 'react-router-dom'
import { AiOutlineArrowRight } from 'react-icons/ai'

const logo = require('../assets/img/monday-logo.webp')

export function HomeHeader({ boards }) {
    return (
        <header className="home-header">
            <nav className='layout'>
                <img src={logo} alt="Logo" />
                <div className='header-btns'>
                    <Link to={'/auth/*'}><button className="btn-login">Log in</button></Link>
                    <Link to={`/board/${boards[0]._id}`}><button className='btn-start'>Get started <span className="arrow"><AiOutlineArrowRight /></span></button></Link>
                </div>
            </nav>
        </header>
    )
}