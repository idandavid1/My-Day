import { Link } from 'react-router-dom'

const logo = require('../assets/img/logo.png')

export default function Logo () {
      return (
            <Link to={'/'} className='logo'>
                  <img className='logo-img' src={logo} alt="Logo" />
                  <h2 className='logo-title'>myday</h2>
            </Link>
      )
}
