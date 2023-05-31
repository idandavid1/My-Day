import { useState } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { TaskPreviewKanban } from './task-preview-kanban'
import { TitleGroupPreview } from '../board/title-group-preview'
import { TaskTitleKanban } from './task-title-kanban'

export function TaskListKanban({ board, group }) {
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

    return (
        <Droppable droppableId={group.id} type="task" >
            {(provided) => (
                <div ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <ul className="task-list-content-kanban" >
                        {group.tasks.map((task, idx) => {
                            return <li key={task.id} className="task-container" onClick={(ev) => { ev.stopPropagation() }}>
                                <Draggable draggableId={task.id} index={idx} key={task.id} type="task">
                                    {(provided) => (
                                        <div {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef} className="flex column">
                                            <TaskTitleKanban task={task} group={group} board={board} />
                                            <div className="flex" style={{ backgroundColor: 'white' }}>
                                                <div className="task-content">
                                                    <ul className="title-container">
                                                        {board.cmpsOrder.map((title, idx) =>
                                                            <li className={title + ' cmp-order-title title'} key={idx}>
                                                                <TitleGroupPreview title={title} board={board} isKanban={true} />
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>
                                                <div key={task.id} >
                                                    <TaskPreviewKanban task={task} group={group} board={board} isTaskModalOpen={isTaskModalOpen} setIsTaskModalOpen={setIsTaskModalOpen} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </Draggable>
                            </li>
                        })}
                        {provided.placeholder}
                    </ul >
                </div>
            )}
        </Droppable>
    )
}
