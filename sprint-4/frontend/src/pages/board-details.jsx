import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadBoard, loadBoards, loadSocketBoard } from "../store/board.actions"

import { BoardHeader } from "../cmps/board/board-header"
import { MainSidebar } from "../cmps/sidebar/main-sidebar"
import { WorkspaceSidebar } from "../cmps/sidebar/workspace-sidebar"
import { GroupList } from '../cmps/board/group-list'
import { useParams, useSearchParams } from 'react-router-dom'
import { BoardModal } from '../cmps/board/board-modal'
import { boardService } from '../services/board.service'
import { socketService, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_UPDATE_BOARD } from '../services/socket.service'
import { LoginLogoutModal } from '../cmps/modal/login-logout-modal'

export function BoardDetails() {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isOpen, setIsOpen] = useState(false)
    const [isStarredOpen, setIsStarredOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = boardService.getFilterFromSearchParams(searchParams)
    const { boardId } = useParams()
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false)

    useEffect(() => {
        loadBoard(boardId, queryFilterBy)
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
    }

    if (!board) return <div>Loading...</div>
    return (
        <section className="board-details flex">
            <div className='sidebar flex'>
                <MainSidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsStarredOpen={setIsStarredOpen} setIsLoginModalOpen={setIsLoginModalOpen} />
                <WorkspaceSidebar isOpen={isOpen} setIsOpen={setIsOpen} isStarredOpen={isStarredOpen} board={board} />
                {/* {isLoginModalOpen && <LoginLogoutModal />} */}
            </div>
            <main className="board-main" >
                <BoardHeader board={board} onSetFilter={onSetFilter} isStarredOpen={isStarredOpen} />
                <GroupList board={board} />
                <BoardModal />
            </main>
        </section>
    )
}