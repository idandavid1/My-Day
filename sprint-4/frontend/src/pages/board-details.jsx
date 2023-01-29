import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadBoard, loadBoards, loadSocketBoard, setFilter } from "../store/board.actions"

import { BoardHeader } from "../cmps/board/board-header"
import { MainSidebar } from "../cmps/sidebar/main-sidebar"
import { WorkspaceSidebar } from "../cmps/sidebar/workspace-sidebar"
import { GroupList } from '../cmps/board/group-list'
import { useParams, useSearchParams } from 'react-router-dom'
import { BoardModal } from '../cmps/board/board-modal'
import { boardService } from '../services/board.service'
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_UPDATE_BOARD } from '../services/socket.service'
import { LoginLogoutModal } from '../cmps/modal/login-logout-modal'
import { CreateBoard } from '../cmps/modal/create-board'
import { BoardActivityModal } from '../cmps/board/board-activity-modal'
import { BoardDescription } from '../cmps/board/board-description'
import { ModalMemberInvite } from '../cmps/modal/modal-member-invite'
import { loadUsers } from '../store/user.actions'

export function BoardDetails() {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const isBoardModalOpen = useSelector(storeState => storeState.boardModule.isBoardModalOpen)
    const [isOpen, setIsOpen] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [isStarredOpen, setIsStarredOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isShowDescription, setIsShowDescription] = useState(false)
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const queryFilterBy = boardService.getFilterFromSearchParams(searchParams)
    const { boardId } = useParams()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    
    useEffect(() => {
        loadBoard(boardId, queryFilterBy)
        loadUsers()
        if (!boards.length) loadBoards()
    }, [])

    useEffect(() => {
        socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
        socketService.on(SOCKET_EVENT_ADD_UPDATE_BOARD, loadSocketBoard)

        return () => {
            socketService.off(SOCKET_EVENT_ADD_UPDATE_BOARD, loadSocketBoard)
        }
    }, [])

    function onSetFilter(filterBy) {
        setSearchParams(filterBy)
        loadBoard(boardId, filterBy)
        setFilter(filterBy)
    }

    if (!board) return <div>Loading...</div>
    return (
        <section className="board-details flex">
            <div className='sidebar flex'>
                <MainSidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsStarredOpen={setIsStarredOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
                <WorkspaceSidebar isOpen={isOpen} setIsOpen={setIsOpen} isStarredOpen={isStarredOpen} board={board} setIsCreateModalOpen={setIsCreateModalOpen}/>
            </div>
            <main className="board-main">
                <BoardHeader board={board} onSetFilter={onSetFilter} isStarredOpen={isStarredOpen} setIsShowDescription={setIsShowDescription} setIsInviteModalOpen={setIsInviteModalOpen} />
                <GroupList board={board} />
                <BoardModal setIsMouseOver={setIsMouseOver} />
            </main>
            {isCreateModalOpen && <CreateBoard setIsModalOpen={setIsCreateModalOpen} />}
            {(isInviteModalOpen || isCreateModalOpen || (isBoardModalOpen && isMouseOver)) && <div className='dark-screen'></div>}
            {isShowDescription &&
                <>
                    <BoardDescription setIsShowDescription={setIsShowDescription} board={board}/>
                    <div className='dark-screen'></div>
                </>
            }
            {isLoginModalOpen && <LoginLogoutModal setIsLoginModalOpen={setIsLoginModalOpen}/>}
            {isInviteModalOpen && <ModalMemberInvite board={board} setIsInviteModalOpen={setIsInviteModalOpen}/>}
        </section>
    )
}