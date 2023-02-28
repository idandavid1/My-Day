import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { GroupPreview } from './group-preview'
import { saveBoard, updateDragBetweenGroupsTasks, updateGroupAction } from "../../store/board.actions"

import { useRef } from 'react'

export function GroupList({ board }) {
    const containerRef = useRef()

    // function handleOnDragEnd(ev) {
    //     console.log('ev', ev)
    //     const updatedGroups = [...board.groups]
    //     const [draggedItem] = updatedGroups.splice('ev', ev.source.index, 1)
    //     updatedGroups.splice(ev.destination.index, 0, draggedItem)
    //     board.groups = updatedGroups
    //     saveBoard(board)
    // }
    async function handleOnDragEnd(result) {
        console.log(result)
        let newBoard = structuredClone(board);
        if (!result.destination) {
            return;
        }
        // Reordering groups
        if (result.type === 'group') {
            console.log('group')
            const updatedGroups = [...board.groups]
            const [draggedItem] = updatedGroups.splice(result.source.index, 1)
            updatedGroups.splice(result.destination.index, 0, draggedItem)
            board.groups = updatedGroups
            console.log(board.groups)
            saveBoard(board)
        }
        // Reordering tasks
        if (result.type === 'task') {
            console.log('task')
            const startGroup = newBoard.groups.find(group => group.id === result.source.droppableId)
            const finishGroup = newBoard.groups.find(group => group.id === result.destination.droppableId)
            // Reordering tasks between groups
            if (startGroup !== finishGroup) {
                const [removedTask] = startGroup.tasks.splice(result.source.index, 1)
                finishGroup.tasks.splice(result.destination.index, 0, removedTask)
                // updateDragBetweenGroupsTasks(newBoard, board)
                return
            }
            const updatedTasks = [...startGroup.tasks]
            const [draggedItem] = updatedTasks.splice(result.source.index, 1)
            updatedTasks.splice(result.destination.index, 0, draggedItem)
            startGroup.tasks = updatedTasks
            // updateGroupAction(board, startGroup)
        }
    }

    function getCellWidth() {
        return board.cmpsOrder.reduce((acc, cmpOrder) => {
            if (cmpOrder === 'person') acc += 87
            else acc += 139
            return acc
        }, 600)
    }

    if (!board.groups) return <div></div>
    return <div ref={containerRef} style={{ minWidth: getCellWidth() }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={board._id} type='group'>
                {(droppableProvided) => {
                    return <section ref={droppableProvided.innerRef}{...droppableProvided.droppableProps} className="group-list">
                        <ul>
                            {board.groups.map((group, idx) => {
                                return (
                                    <li key={idx}><GroupPreview idx={idx} group={group} board={board} /></li>)
                            })}
                        </ul>
                    </section>
                }}
            </Droppable>
        </DragDropContext>
    </div>
}