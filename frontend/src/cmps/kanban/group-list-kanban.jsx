import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { handleOnDragEnd } from "../../store/board.actions"
import { GroupPreviewKanban } from "./group-preview-kanban"

export function GroupListKanban({ board }) {

    if (!board.groups) return <div></div>
    return (
        <DragDropContext onDragEnd={(ev) => handleOnDragEnd(ev, board)}>
            <Droppable droppableId='groupList' type='group' direction='horizontal'>
                {(provided) => (
                    <div ref={provided.innerRef}
                        {...provided.droppableProps}>
                        <div className="group-list-kanban">
                            {board.groups.map((group, index) =>
                                <div className="group-list-ul" key={group.id}>
                                    <Draggable key={group.id} draggableId={`group ${group.id}`} index={index} >
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                ref={provided.innerRef}
                                                className='flex'>
                                                <GroupPreviewKanban board={board} group={group} index={index} />
                                            </div>
                                        )}
                                    </Draggable>
                                </div>
                            )}
                        </div>
                        {provided.placeholder}
                    </div >
                )}
            </Droppable>
        </DragDropContext>
    )
}

