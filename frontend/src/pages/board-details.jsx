import { useParams, useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_UPDATE_BOARD } from '../services/socket.service'
import { loadBoard, loadBoards, loadSocketBoard,setFilter } from '../store/board.actions'
import { ModalMemberInvite } from '../cmps/modal/modal-member-invite'
import { WorkspaceSidebar } from '../cmps/sidebar/workspace-sidebar'
import { LoginLogoutModal } from '../cmps/modal/login-logout-modal'
import { GroupListKanban } from '../cmps/kanban/group-list-kanban'
import { BoardDescription } from '../cmps/board/board-description'
import { MainSidebar } from '../cmps/sidebar/main-sidebar'
import { DynamicModal } from '../cmps/modal/dynamic-modal'
import { boardService } from '../services/board.service'
import { CreateBoard } from '../cmps/modal/create-board'
import { BoardHeader } from '../cmps/board/board-header'
import { BoardModal } from '../cmps/board/board-modal'
import { GroupList } from '../cmps/board/group-list'
import { loadUsers } from '../store/user.actions'
import { Loader } from '../cmps/loader'
import { Dashboard } from './dashboard'

export function BoardDetails() {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const isBoardModalOpen = useSelector(storeState => storeState.boardModule.isBoardModalOpen)

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
    const [isShowDescription, setIsShowDescription] = useState(false)
    const [isInviteModalOpen, setIsInviteModalOpen] = useState(false)
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)
    const [isStarredOpen, setIsStarredOpen] = useState(false)
    const [isMouseOver, setIsMouseOver] = useState(false)
    const [boardType, setBoardType] = useState('table')
    const [isOpen, setIsOpen] = useState(false)
    
    const { boardId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = boardService.getFilterFromSearchParams(searchParams)

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

    useEffect(() => {
        socketService.off(SOCKET_EVENT_ADD_UPDATE_BOARD, loadSocketBoard)
        socketService.emit(SOCKET_EMIT_SET_TOPIC, boardId)
        socketService.on(SOCKET_EVENT_ADD_UPDATE_BOARD, loadSocketBoard)
    }, [boardId, isBoardModalOpen])

    function onSetFilter(filterBy) {
        setSearchParams(filterBy)
        loadBoard(boardId, filterBy)
        setFilter(filterBy)
    }

    if (!board) return <Loader />
    return (
            <section className="board-details flex">
                <div className='sidebar flex'>
                    <MainSidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsStarredOpen={setIsStarredOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
                    <WorkspaceSidebar isOpen={isOpen} setIsOpen={setIsOpen} isStarredOpen={isStarredOpen} board={board} setIsCreateModalOpen={setIsCreateModalOpen} />
                </div>
                <main className="board-main">
                    <BoardHeader boardType={boardType} setBoardType={setBoardType} board={board} onSetFilter={onSetFilter} isStarredOpen={isStarredOpen} setIsShowDescription={setIsShowDescription} setIsInviteModalOpen={setIsInviteModalOpen} />
                    {boardType === 'table' && <GroupList board={board} />}

                    {boardType === 'kanban' &&
                        <GroupListKanban board={board} />
                    }
                    <BoardModal setIsMouseOver={setIsMouseOver} />
                    {boardType === 'dashboard' && <Dashboard />}
                </main>
                {isCreateModalOpen && <CreateBoard setIsModalOpen={setIsCreateModalOpen} />}
                {(isInviteModalOpen || isCreateModalOpen || (isBoardModalOpen && isMouseOver)) && <div className='dark-screen'></div>}
                {isShowDescription &&
                    <>
                        <BoardDescription setIsShowDescription={setIsShowDescription} board={board} />
                        <div className='dark-screen'></div>
                    </>
                }
                {isLoginModalOpen && <LoginLogoutModal setIsLoginModalOpen={setIsLoginModalOpen} />}
                {isInviteModalOpen && <ModalMemberInvite board={board} setIsInviteModalOpen={setIsInviteModalOpen} />}
                <DynamicModal />
            </section>
    )
}