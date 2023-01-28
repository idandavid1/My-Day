import { useState } from "react"
import { useEffect } from "react"

import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { TaskModal } from "../modal/task-modal"
import { BoardActivityModal } from "./board-activity-modal"

export function BoardModal({ setIsMouseOver }) {
    const { groupId, taskId, activityLog } = useParams()
    const [currTask, setCurrTask] = useState(null)
    const board = useSelector((storeState) => storeState.boardModule.board)
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)

    useEffect(() => {
        if (taskId && groupId) {
            loadTask()
        }
    }, [taskId])

    function loadTask() {
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        setCurrTask(task)
    }

    if (!currTask && !activityLog) return <div></div>
    return <section className={`board-modal ${isOpen ? 'open' : ''}`} onMouseOver={() => setIsMouseOver(true)} onMouseOut={() => setIsMouseOver(false)}>
        {!activityLog && <TaskModal task={currTask} board={board} groupId={groupId} />}
        {activityLog && <section className="board-activity-modal">
            <BoardActivityModal board={board} />
        </section>}
    </section>
}