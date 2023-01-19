import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { loadBoards } from "../store/board.actions"

import { BoardHeader } from "../cmps/board/board-header"
import { MainSidebar } from "../cmps/sidebar/main-sidebar"
import { WorkspaceSidebar } from "../cmps/sidebar/workspace-sidebar"
import { GroupList } from '../cmps/board/group-list'

export function BoardDetails() {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    useEffect(() => {
        loadBoards()
    }, [])
    
    if (!boards.length) return <div>Loading...</div>
    return (
        <section className="board-details">
            <MainSidebar />
            <WorkspaceSidebar boards={boards} />
            <main className="board-main">
                <BoardHeader board={boards[0]} />
                <GroupList board={boards[0]} />
            </main>
        </section>
    )
}