import { useRef, useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"
import { BiDotsHorizontalRounded, BiMessageRoundedAdd } from "react-icons/bi"
import { HiOutlineChatBubbleOvalLeft } from "react-icons/hi2"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"
import { toggleModal, updateGroupAction, updatePickerCmpsOrder, updateTaskAction } from "../../store/board.actions"
import { TitleGroupPreview } from "../board/title-group-preview"
import { TaskPreviewKanban } from "./task-preview-kanban"

export function TaskListKanban({ board, group, index }) {
    const taskRef = useRef()
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)



    function handleOnDragEnd(ev) {
        const updatedTasks = [...group.tasks]
        const [draggedItem] = updatedTasks.splice(ev.source.index, 1)
        updatedTasks.splice(ev.destination.index, 0, draggedItem)
        group.tasks = updatedTasks
        updateGroupAction(board, group)
    }

    function handleHorizontalDrag(ev) {
        const updatedTitles = [...board.cmpsOrder]
        const [draggedItem] = updatedTitles.splice(ev.source.index, 1)
        updatedTitles.splice(ev.destination.index, 0, draggedItem)
        updatePickerCmpsOrder(board, updatedTitles)
    }

    // function handleChange({ target }) {
    //     let { value, name: field } = target
    //     setTaskToEdit((prevTask) => ({ ...prevTask, [field]: value }))
    // }

    // function onAddTask(ev) {
    //     ev.preventDefault()
    //     if (!taskToEdit.title) return
    //     const activity = boardService.getEmptyActivity()
    //     activity.from = { color: group.color, title: group.title }
    //     activity.action = 'create'
    //     taskToEdit.updatedBy.date = Date.now()
    //     taskToEdit.updatedBy.imgUrl = user?.imgUrl || guest
    //     addTask(taskToEdit, group, board, activity)
    //     setTaskToEdit(boardService.getEmptyTask())
    // }
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

        <ul className="task-list-content-kanban">
            <Droppable droppableId={group.id} type="task">
                {(provided) => (
                    <div ref={provided.innerRef}
                        {...provided.droppableProps}>

                        {group.tasks.map((task , idx) => {
                            return <li className="task-container" onClick={(ev) => { ev.stopPropagation() }}>
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
                                        <BiDotsHorizontalRounded className="icon" onClick={() => setIsTaskModalOpen(!isTaskModalOpen)}/>
                                    </div>
                                </div>
                                <Draggable draggableId={task.id} index={idx} key={task.id} type="task">
                                    {(provided) => (
                                        <div {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                            ref={provided.innerRef}
                                            className="flex">


                                            <div className="task-content">
                                                <ul className="title-container">
                                                    {board.cmpsOrder.map((title, idx) =>
                                                        <li className={title + ' cmp-order-title title'} key={idx}>
                                                            <TitleGroupPreview title={title} board={board} isKanban={true} />
                                                        </li>
                                                    )}
                                                </ul>
                                            </div>
                                            <li >
                                                <TaskPreviewKanban task={task} group={group} board={board} isTaskModalOpen={isTaskModalOpen} setIsTaskModalOpen={setIsTaskModalOpen} />
                                            </li>

                                            {provided.placeholder}
                                        </div>
                                    )}
                                </Draggable>
                            </li>
                        })}
                    </div>
                )}
            </Droppable>
        </ul >

    )
}
//     return (
//         <ul className="task-list-content-kanban">
//             {group.tasks.map(task => {
//                 return <li>
//                     <div className="task-title" >
//                         <blockquote contentEditable onBlur={(ev) => onUpdateTaskTitle(ev, task)} suppressContentEditableWarning={true}>
//                             <span>{task.title}</span>
//                         </blockquote>
//                         <div onClick={() => onOpenModal(task)} className="chat-icon">
//                             {task.comments.length > 0 && <div>
//                                 <HiOutlineChatBubbleOvalLeft className="comment-chat" />
//                                 <div className="count-comment">{task.comments.length}</div>
//                             </div>}
//                             {task.comments.length === 0 && <BiMessageRoundedAdd className="icon" />}
//                         </div>
//                     </div>
//                     <div className="task-content">

//                         <ul className="title-container">
//                             {board.cmpsOrder.map((title, idx) =>
//                                 <li className={title + ' cmp-order-title title'} key={idx}>
//                                     <TitleGroupPreview title={title} board={board} isKanban={true} />
//                                 </li>
//                             )}
//                         </ul>
//                         <div ref={taskRef}>
//                             <DragDropContext onDragEnd={handleOnDragEnd}>
//                                 <Droppable droppableId={group.id}>
//                                     {(droppableProvided) => {
//                                         return <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} >
//                                             {group.tasks.map((task, idx) => (
//                                                 <Draggable key={task.id} draggableId={task.id} index={idx}>
//                                                     {(provided) => {
//                                                         return <li className={`parent-task-preview `} ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps} key={idx}>
//                                                             <TaskPreviewKanban task={task} group={group} board={board} />
//                                                         </li>
//                                                     }}
//                                                 </Draggable>
//                                             ))}
//                                             {droppableProvided.placeholder}
//                                         </div>
//                                     }}
//                                 </Droppable>
//                             </DragDropContext>
//                         </div>
//                     </div>

//                 </li>
//             })}
//         </ul >
//     )
// }
