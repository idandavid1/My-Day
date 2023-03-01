import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Draggable, Droppable } from 'react-beautiful-dnd'

import { TaskPreviewKanban } from './task-preview-kanban'
import { TitleGroupPreview } from '../board/title-group-preview'
import { toggleModal, updateTaskAction } from '../../store/board.actions'

import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { BiDotsHorizontalRounded, BiMessageRoundedAdd } from 'react-icons/bi'

export function TaskListKanban({ board, group }) {
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)

    async function onUpdateTaskTitle(ev, task) {
        const value = ev.target.innerText
        task.title = value
        try {
            await updateTaskAction(board, group.id, task)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    function onOpenModal(task) {
        toggleModal(isOpen)
        Navigate(`/board/${board._id}/${group.id}/${task.id}`)
    }

    return (
        <Droppable droppableId={group.id} type="task" >
            {(provided) => (
                <div ref={provided.innerRef}
                    {...provided.droppableProps}>
                    <ul className="task-list-content-kanban">
                        {group.tasks.map((task, idx) => {
                            return <li className="task-container" onClick={(ev) => { ev.stopPropagation() }}>
                                <Draggable draggableId={task.id} index={idx} key={task.id} type="task">
                                    {(provided) => (
                                        <div {...provided.draggableProps}{...provided.dragHandleProps} ref={provided.innerRef} className="flex column">
                                            <div className="task-title" >
                                                <blockquote contentEditable onBlur={(ev) => onUpdateTaskTitle(ev, task)} suppressContentEditableWarning={true}>
                                                    <span>{task.title}</span>
                                                </blockquote>
                                                <div onClick={() => onOpenModal(task)} className="chat-icon">
                                                    {task.comments.length > 0 && <div>
                                                        <HiOutlineChatBubbleOvalLeft className="comment-chat" />
                                                        <div className="count-comment">{task.comments.length}</div>
                                                    </div>}
                                                    {task.comments.length === 0 && <BiMessageRoundedAdd className="icon" />}
                                                </div>
                                                <div className="task-menu">
                                                    <BiDotsHorizontalRounded className="icon" onClick={() => setIsTaskModalOpen(!isTaskModalOpen)} />
                                                </div>
                                            </div>
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
                                                <li key={task.id} >
                                                    <TaskPreviewKanban task={task} group={group} board={board} isTaskModalOpen={isTaskModalOpen} setIsTaskModalOpen={setIsTaskModalOpen} />
                                                </li>
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
