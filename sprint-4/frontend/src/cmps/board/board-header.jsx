import { useState } from 'react'

import { BoardFilter } from '../board/board-filter'
import { saveBoard, toggleModal, toggleStarred } from '../../store/board.actions'
import { loadBoards } from '../../store/board.actions'

import { RiErrorWarningLine } from 'react-icons/ri'
import { BsStar } from 'react-icons/bs'
import { BsStarFill } from 'react-icons/bs'
import { FiActivity } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RiUserAddLine } from 'react-icons/ri'

const guest = require('../../assets/img/guest.png')

export function BoardHeader({ board, onSetFilter, isStarredOpen, setIsShowDescription, setIsInviteModalOpen }) {
    const isOpen = useSelector(storeState => storeState.boardModule.isBoardModalOpen)
    const navigate = useNavigate()
    // const members = info.memberIds.map(member => getMember(member))

    async function onSave(ev) {
        const value = ev.target.innerText
        board.title = value
        try {
            saveBoard(board)
            loadBoards()
        } catch (err) {
            console.log('Failed to save')
        }
    }

    function onToggleStarred() {
        try {
            toggleStarred(board, isStarredOpen)
        } catch (err) {
            console.log(err)
        }
    }

    function toggleIsOpen(type) {
        toggleModal(isOpen)
        navigate(`/board/${board._id}/${type}`)
    }
    if (!board.members) return <div></div>

    return (
        <header className="board-header">
            <section className='board-title'>
                <div className="board-info">
                    <blockquote data-title='Click to Edit' contentEditable onBlur={onSave} suppressContentEditableWarning={true}>
                        <h1>{board.title}</h1>
                    </blockquote>
                    <div data-title='Show board description' className='info-btn icon' onClick={() => setIsShowDescription(true)}>
                        <RiErrorWarningLine />
                    </div>
                    <div data-title='Add to favorites' className='star-btn icon' onClick={onToggleStarred}>
                        {!board.isStarred ? <BsStar /> : <BsStarFill className="star-full" />}
                    </div>
                </div>
                <div className='board-tools flex'>
                    <div className='activity' onClick={() => toggleIsOpen('activity')}><FiActivity /></div>
                    <div className='members-last-seen' onClick={() => toggleIsOpen('last-viewed')}>
                        <span className='last-seen-title'>Last seen</span>
                        <div className='flex members-imgs'>
                            <img className='member-img1' src={board.members.length ? board.members[0].imgUrl : guest} alt="member" />
                            <img className='member-img2' src={board.members.length > 1 ? board.members[1].imgUrl : guest} alt="member" />
                            <div className='show-more-members'>
                                <span className='show-more-count'>+2</span>
                            </div>
                        </div>
                    </div>
                    <div className="invite" onClick={() => setIsInviteModalOpen(prev => !prev)}>
                        <RiUserAddLine className="invite-icon" />
                        <span className='invite-title'> Invite / 1</span>
                        {/* {isModalOpen && <ModalMember className="invite-modal"/>} */}
                    </div>
                </div>
            </section>
            <div className='board-description'>
                {console.log(board.description)}
                {board.description && <p className='board-description-link'>{board.description} <span onClick={() => setIsShowDescription(true)}>See More</span></p>}
            </div>
            <div className='board-display-btns' >
                <div className='main-table-btn active' >
                    <GrHomeRounded className='icon' />
                    <span data-title='Main Table'>Main Table</span>
                    {/* <NavLink to={`/board/${board._id}`}></NavLink> */}
                </div>
                {/* <div className='kanban'>
                    <NavLink to={`/board/kanban/${board._id}`}>Kanban</NavLink>
                </div> */}
            </div>
            <div className='board-border'></div>
            <BoardFilter onSetFilter={onSetFilter} board={board} />
        </header >
    )
}