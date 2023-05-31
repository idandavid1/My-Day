import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { AiOutlineStar } from 'react-icons/ai'
import { VscTriangleLeft } from 'react-icons/vsc'
import { closeDynamicModal } from '../../store/board.actions'
import WorkspaceIcon from './workspace-icon'

const logo = require('../../assets/img/logo.png')
const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"

export function MainSidebar ({ setIsLoginModalOpen, setWorkspaceDisplay , setIsWorkspaceOpen}) {
    const [display, setDisplay] = useState('board')
    const user = useSelector(storeState => storeState.userModule.user)

    function onChooseIcon (icon) {
        setDisplay(icon)
        setWorkspaceDisplay(icon)
        setIsWorkspaceOpen(true)
    }
    return (
        <section className="main-sidebar flex">
            <Link to={'/'} className='icon-link'>
                <img className='home-img' src={logo} alt="logo" onClick={closeDynamicModal} />
            </Link>
            <div className='tools-container flex column align-center'>
                <div className="icon-container" onClick={() => onChooseIcon('board')} >
                    <WorkspaceIcon />
                    {display === 'board' && <VscTriangleLeft className="triangle-icon" />}
                </div>
                {/* TODO:Popover */}
                <div data-title="Favorites" className='icon-container' onClick={() => onChooseIcon('starred')}>
                    < AiOutlineStar />
                    {display === 'starred' && <VscTriangleLeft className="triangle-icon" />}</div>
            </div>
            <div className='bottom'>
                <img className='logged-user-img' src={(user && user.imgUrl) ? user.imgUrl : guest} alt="" onClick={() => setIsLoginModalOpen(prev => !prev)} />
            </div>
        </section>
    )
}