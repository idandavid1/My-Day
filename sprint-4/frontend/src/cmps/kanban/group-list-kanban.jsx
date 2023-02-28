import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'

import { saveBoard, updateDragBetweenGroupsTasks, updateGroupAction } from "../../store/board.actions"
import { GroupPreviewKanban } from "./group-preview-kanban"

export function GroupListKanban({ board }) {

    async function handleOnDragEnd(result) {
        let newBoard = structuredClone(board);
        if (!result.destination) {
            return;
        }
        // Reordering groups
        if (result.type === 'group') {
            const updatedGroups = [...board.groups]
            const [draggedItem] = updatedGroups.splice(result.source.index, 1)
            updatedGroups.splice(result.destination.index, 0, draggedItem)
            board.groups = updatedGroups
            saveBoard(board)
        }
        // Reordering tasks
        if (result.type === 'task') {
            const startGroup = newBoard.groups.find(group => group.id === result.source.droppableId)
            const finishGroup = newBoard.groups.find(group => group.id === result.destination.droppableId)
            // Reordering tasks between groups
            if (startGroup !== finishGroup) {
                const [removedTask] = startGroup.tasks.splice(result.source.index, 1)
                finishGroup.tasks.splice(result.destination.index, 0, removedTask)
                updateDragBetweenGroupsTasks(newBoard, board)
                return
            }
            const updatedTasks = [...startGroup.tasks]
            const [draggedItem] = updatedTasks.splice(result.source.index, 1)
            updatedTasks.splice(result.destination.index, 0, draggedItem)
            startGroup.tasks = updatedTasks
            updateGroupAction(board, startGroup)
        }
    }

    if (!board.groups) return <div></div>
    return (
        <DragDropContext onDragEnd={handleOnDragEnd}>
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
