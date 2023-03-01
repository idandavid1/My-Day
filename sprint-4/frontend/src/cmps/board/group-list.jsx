import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { GroupPreview } from './group-preview'
import { handleOnDragEnd } from "../../store/board.actions"

import { useRef } from 'react'

export function GroupList({ board }) {
    const containerRef = useRef()

    function getCellWidth() {
        return board.cmpsOrder.reduce((acc, cmpOrder) => {
            if (cmpOrder === 'person') acc += 87
            else acc += 139
            return acc
        }, 600)
    }

    if (!board.groups) return <div></div>
    return <div ref={containerRef} style={{ minWidth: getCellWidth() }}>
        <DragDropContext onDragEnd={(ev) => handleOnDragEnd(ev, board)}>
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