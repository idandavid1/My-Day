import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadBoard, loadBoards, setFilter } from "../store/board.actions"

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
    const [searchParams , setSearchParams] = useSearchParams()
    const queryFilterBy = boardService.getFilterFromSearchParams(searchParams)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
        if(!boards.length) loadBoards()
    }, [])
    // TODO: filter and sort
    function onSetFilter(filterBy) {
        setSearchParams(filterBy)
        setFilter(filterBy)
    }
    
    if(!board) return <div>Loading...</div>
    return (
        <section className="board-details">
            <MainSidebar />
            <WorkspaceSidebar />
            <main className="board-main">
                <BoardHeader board={board} onSetFilter={onSetFilter} />
                <GroupList board={board} />
            </main>
        </section>
    )
}