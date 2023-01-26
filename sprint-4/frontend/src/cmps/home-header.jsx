import { Link } from 'react-router-dom'
import { HiOutlineArrowRight } from 'react-icons/hi'

const logo = require('../assets/img/logo.png')

export function HomeHeader({ boards }) {
    return (
        <header className="home-header">
            <nav className='layout'>
                <img src={logo} alt="Logo" />
                <div className='header-btns'>
                    <Link to={'/auth/login'}><button className="btn-login">Log in</button></Link>
                    <Link to={`/board/${boards[0]._id}`}><button className='btn-start'>Get started <span className="arrow"><HiOutlineArrowRight /></span></button></Link>
                </div>
            </nav>
        </header>
    )
}