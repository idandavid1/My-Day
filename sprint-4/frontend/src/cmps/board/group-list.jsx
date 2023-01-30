import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { GroupPreview } from './group-preview'
import { saveBoard } from "../../store/board.actions"

import { useRef } from 'react'

export function GroupList({ board }) {
    const containerRef = useRef()

    function handleOnDragEnd(ev) {
        const updatedGroups = [...board.groups]
        const [draggedItem] = updatedGroups.splice(ev.source.index, 1)
        updatedGroups.splice(ev.destination.index, 0, draggedItem)
        board.groups = updatedGroups
        saveBoard(board)
    }

    function getCellWidth() {
        return board.cmpsOrder.reduce((acc, cmpOrder) => {
            if (cmpOrder === 'person') acc += 87
            else acc += 139
            return acc
        }, 400)
    }

    if (!board.groups) return <div></div>
    return <div ref={containerRef} style={{ minWidth: getCellWidth() }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId={board._id}>
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