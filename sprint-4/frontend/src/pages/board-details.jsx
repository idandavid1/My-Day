import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadBoard, loadBoards } from "../store/board.actions"

import { BoardHeader } from "../cmps/board/board-header"
import { MainSidebar } from "../cmps/sidebar/main-sidebar"
import { WorkspaceSidebar } from "../cmps/sidebar/workspace-sidebar"
import { GroupList } from '../cmps/board/group-list'
import { useParams, useSearchParams } from 'react-router-dom'
import { BoardModal } from '../cmps/board/board-modal'
import { boardService } from '../services/board.service'

export function BoardDetails() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const [isOpen, setIsOpen] = useState(false)
    const [isStarredOpen, setIsStarredOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const queryFilterBy = boardService.getFilterFromSearchParams(searchParams)
    const { boardId } = useParams()

    // const mainStyle = isOpen ? {left:'317px'} : {}

    useEffect(() => {
        loadBoard(boardId, queryFilterBy)
        if (!boards.length) loadBoards()
    }, [])

    function onSetFilter(filterBy) {
        setSearchParams(filterBy)
        loadBoard(boardId, filterBy)
    }

    if (!board) return <div>Loading...</div>
    return (
        <section className="board-details flex">
            <div className='sidebar flex'>
                <MainSidebar isOpen={isOpen} setIsOpen={setIsOpen} setIsStarredOpen={setIsStarredOpen}/>
                <WorkspaceSidebar isOpen={isOpen} setIsOpen={setIsOpen} isStarredOpen={isStarredOpen} board={board}/>
            </div>
            <main className="board-main" >
                <BoardHeader board={board} onSetFilter={onSetFilter} />
                <GroupList board={board} />
                <BoardModal />
            </main>
        </section>
    )
}