import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBoard } from "../store/board.actions"

import { BoardHeader } from "../cmps/board/board-header"
import { MainSidebar } from "../cmps/sidebar/main-sidebar"
import { WorkspaceSidebar } from "../cmps/sidebar/workspace-sidebar"
import { GroupList } from '../cmps/board/group-list'
import { useParams } from 'react-router-dom'

export function BoardDetails() {
    const board = useSelector(storeState => storeState.boardModule.board)
    const { boardId } = useParams()

    useEffect(() => {
        loadBoard(boardId)
    }, [])

    if(!board) return <div>Loading...</div>
    return (
        <section className="board-details">
            <MainSidebar />
            <WorkspaceSidebar />
            <main className="board-main">
                <BoardHeader board={board} />
                <GroupList board={board} />
            </main>
        </section>
    )
}