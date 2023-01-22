import { GroupPreview } from './group-preview'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
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
    // Kai
    // return (

    //             <DragDropContext onDragEnd={(result) => console.log('result', result)}>
    //     <section className="group-list">
    //         <ul>
    //                 {board.groups.map((group) =>
    //                 (
    //                     <Droppable key={group._id} droppableId={group._id}>
    //                         {(provided, snapchat) => (
    //                             <div ref={provided.innerRef}
    //                                 {...provided.draggableProps}
    //                                 {...provided.dragHandleProps}>
    //                                 <li key={group.id}>
    //                                     <GroupPreview group={group} board={board} provided={provided} snapchat={snapchat} />
    //                                 </li>
    //                             </div>)}
    //                     </Droppable>
    //                 )
    //                 )}
    //         </ul>
    //     </section>
    //             </DragDropContext>
    // )
    // original
    // return (

    //     <section className="group-list">
    //         <ul>
    //             {board.groups.map((group, idx) => {
    //                 return (
    //                     <li key={idx}><GroupPreview group={group} board={board} /></li>
    //                 )
    //             })}

    //         </ul>
    //     </section>

    // )

    // try

    return <div ref={containerRef}>

        <DragDropContext onDragEnd={handleOnDragEnd}>
            <Droppable droppableId='group'>
                {(droppableProvided) => {
                    return <section ref={droppableProvided.innerRef}{...droppableProvided.droppableProps} className="group-list">
                        <ul>
                            {board.groups.map((group, idx) => {
                                return (
                                    <li key={idx}><GroupPreview idx={idx} group={group} board={board} /></li>
                                )
                            })}

                        </ul>
                    </section>
                }}
            </Droppable>
        </DragDropContext>
    </div>
}