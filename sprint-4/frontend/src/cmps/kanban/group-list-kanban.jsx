import { useRef } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { saveBoard } from "../../store/board.actions"
import { GroupPreviewKanban } from "./group-preview-kanban"


export function GroupListKanban({ board }) {
    const containerRef = useRef()

    function handleOnDragEnd(ev) {
        const updatedGroups = [...board.groups]
        const [draggedItem] = updatedGroups.splice(ev.source.index, 1)
        updatedGroups.splice(ev.destination.index, 0, draggedItem)
        board.groups = updatedGroups
        saveBoard(board)
    }

    if (!board.groups) return <div></div>
    // return <div ref={containerRef}>
    //     <DragDropContext onDragEnd={handleOnDragEnd}>
    //         <Droppable droppableId={board._id}>
    //             {(droppableProvided) => {
    //                 return <section ref={droppableProvided.innerRef}{...droppableProvided.droppableProps} className="group-list-kanban">
    //                     <ul className="group-list-ul">
    //                         {board.groups.map((group, idx) => {
    //                             return (
    //                                 <li key={idx}><GroupPreviewKanban idx={idx} group={group} board={board}/></li>)
    //                         })}
    //                     </ul>
    //                 </section>
    //             }}
    //         </Droppable>
    //     </DragDropContext>
    // </div>

    // TRY
    return (
        <div className="group-list-kanban">
            {board.groups.map((group, index) =>
                <ul className="group-list-ul" key={group.id}>
                    <Draggable key={group.id} draggableId={`group ${group.id}`} index={index} >
                        {(provided) => (
                            <li
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                className='flex'
                            >
                                <GroupPreviewKanban board={board} group={group} index={index} />
                            </li>
                        )}
                    </Draggable>
                </ul>
            )}
        </div>
    )
}