import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState } from 'react'

import { AiOutlineStar, AiOutlineMenu } from 'react-icons/ai'
import { VscTriangleLeft } from 'react-icons/vsc'
import { closeDynamicModal } from '../../store/board.actions'
import WorkspaceIcon from './workspace-icon'
import { Tooltip } from '@mui/material'

const logo = require('../../assets/img/logo.png')
const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"

export function MainSidebar ({ setIsLoginModalOpen, setWorkspaceDisplay, setIsWorkspaceOpen }) {
    const [display, setDisplay] = useState('board')
    const user = useSelector(storeState => storeState.userModule.user)

    function onChooseIcon (icon) {
        setDisplay(icon)
        setWorkspaceDisplay(icon)
        setIsWorkspaceOpen(true)
    }
    return (
        <section className="main-sidebar flex">
            <span className='open-workspace-btn'>
                <AiOutlineMenu onClick={() => setIsWorkspaceOpen(prev => !prev)} />
            </span>
            <Link to={'/'} className='icon-link'>
                <Tooltip title="Home" arrow>
                    <img className='home-img' src={logo} alt="logo" onClick={closeDynamicModal} />
                </Tooltip>
            </Link>
            <div className='tools-container flex column align-center'>
                <Tooltip title="Workspaces" arrow>
                    <div className="icon-container" onClick={() => onChooseIcon('board')} >
                        <WorkspaceIcon />
                        {display === 'board' && <VscTriangleLeft className="triangle-icon" />}
                    </div>
                </Tooltip>
                <Tooltip title="Favorites" arrow>
                    <div className='icon-container' onClick={() => onChooseIcon('starred')}>
                        < AiOutlineStar />
                        {display === 'starred' && <VscTriangleLeft className="triangle-icon" />}
                    </div>
                </Tooltip>
            </div>
            <div className='bottom'>
                <Tooltip title="Login & Logout" arrow>
                    <img className='logged-user-img' src={(user && user.imgUrl) ? user.imgUrl : guest} alt="" onClick={() => setIsLoginModalOpen(prev => !prev)} />
                </Tooltip>
            </div>
        </section>
    )
}