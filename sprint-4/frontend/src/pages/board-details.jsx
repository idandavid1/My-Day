import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { loadBoard, loadBoards } from "../store/board.actions"

import { BoardHeader } from "../cmps/board/board-header"
import { MainSidebar } from "../cmps/sidebar/main-sidebar"
import { WorkspaceSidebar } from "../cmps/sidebar/workspace-sidebar"
import { GroupList } from '../cmps/board/group-list'
import { useParams } from 'react-router-dom'
import { BoardModal } from '../cmps/board/board-modal'

export function BoardDetails() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
        if(!boards.length) loadBoards()
    }, [])

    
    if(!board) return <div>Loading...</div>
    return (
        <section className="board-details">
            <MainSidebar />
            <WorkspaceSidebar />
            <main className="board-main">
                <BoardHeader board={board} />
                <GroupList board={board} />
                <BoardModal />
            </main>
        </section>
    )
}