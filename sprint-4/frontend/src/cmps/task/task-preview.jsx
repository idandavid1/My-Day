import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { DueDate } from "./date-picker"
import { MemberPicker } from "./member-picker"
import { PriorityPicker } from "./priority-picker"
import { StatusPicker } from "./status-picker"
import { duplicateTask, toggleModal, updateGroupAction, updateTaskAction } from "../../store/board.actions"

import { TbArrowsDiagonal } from 'react-icons/tb'
import { BiDotsHorizontalRounded, BiMessageRoundedAdd } from 'react-icons/bi'
import { TaskMenuModal } from "../modal/task-menu-modal"
import { utilService } from "../../services/util.service"
import { boardService } from "../../services/board.service"
import { TaskToolsModal } from "../modal/task-tools-modal"
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'

export function TaskPreview({ task, group, board }) {
    const elTaskPreview = useRef(null)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)
    const navigate = useNavigate()
    const selectedTasks = useRef([])

    async function updateTask(cmpType, data, activity) {
        task[cmpType] = data
        try {
            await updateTaskAction(board, group.id, task, activity)
        } catch (err) {
            console.log(err)
        }
    }

    async function onUpdateTaskTitle(ev) {
        const value = ev.target.innerText
        task.title = value
        try {
            elTaskPreview.current.classList.toggle('on-typing')
            await updateTaskAction(board, group.id, task)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    function onOpenModal() {
        toggleModal(isOpen)
        navigate(`/board/${board._id}/${group.id}/${task.id}`)
    }

    async function onRemoveTask(taskId) {
        try {
            const tasksToSave = group.tasks.filter(task => task.id !== taskId)
            group.tasks = tasksToSave
            await updateGroupAction(board, group)
            setIsTaskModalOpen(false)
        } catch (err) {
            console.log('Failed to remove task', err)
        }
    }

    async function onDuplicateTask() {
        try {
            duplicateTask(board, group, task)
            setIsTaskModalOpen(false)
        } catch (err) {
            console.log(err)
        }
    }

    async function onCreateNewTaskBelow() {
        try {
            const newTask = boardService.getEmptyTask()
            newTask.id = utilService.makeId()
            newTask.title = 'New Task'
            const idx = group.tasks.indexOf(task)
            group.tasks.splice(idx + 1, 0, newTask)
            updateGroupAction(board, group)
            setIsTaskModalOpen(false)
        } catch (err) {
            console.log(err)
        }
    }

    function onSelectTask(task) {
        if (selectedTasks.findIndex(currTask => task.id === currTask.id)) {
            selectedTasks.splice(task.id, 1)
        }
        selectedTasks.push(task)
        console.log(selectedTasks)
    }

    return (
        <section className="task-preview" ref={elTaskPreview}>
            <div className="sticky-div" style={{ borderColor: group.color }}>
            {isTaskModalOpen && <TaskMenuModal taskId={task.id} onRemoveTask={onRemoveTask} onDuplicateTask={onDuplicateTask}
                onOpenModal={onOpenModal} onCreateNewTaskBelow={onCreateNewTaskBelow} />}
              <div className="task-menu">
                <BiDotsHorizontalRounded className="icon" onClick={() => setIsTaskModalOpen(!isTaskModalOpen)} />
            </div>

                <div className="check-box">
                    <input type="checkbox"
                        value={task} onChange={() => onSelectTask(task)} />
                </div>
                <div className="task-title picker" onClick={() => elTaskPreview.current.classList.toggle('on-typing')}>
                    <blockquote contentEditable onBlur={onUpdateTaskTitle} suppressContentEditableWarning={true}>
                        <span>{task.title}</span>
                    </blockquote>
                    <div className="open-task-details" onClick={onOpenModal}>
                        <TbArrowsDiagonal />
                        <span>Open</span>
                    </div>
                    <div onClick={onOpenModal} className="chat-icon">
                        {console.log(task.comments)}
                        {task.comments.length > 0 && <div>
                            <HiOutlineChatBubbleOvalLeft className="comment-chat" />
                            <div className="count-comment">{task.comments.length}</div>
                        </div>}
                        {task.comments.length === 0 && <BiMessageRoundedAdd className="icon" />}
                    </div>
                </div>
            </div>

            {/* {board.cmpsOrder.map((cmp, idx) => {
                <Draggable key={cmp} draggableId={cmp} index={idx}>
                    {(provided, snapshot) => {
                        return <div ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <DynamicCmp
                                cmp={cmp}
                                key={idx}
                                info={task}
                                onUpdate={updateTask}
                            />
                        </div>
                    }}
                    </Draggable>

                { droppableProvided.placeholder }
            })} */}
            {/* original */}
            {board.cmpsOrder.map((cmp, idx) => {

                return (
                    <DynamicCmp
                        cmp={cmp}
                        key={idx}
                        info={task}
                        onUpdate={updateTask}
                    />)
            })}
            <div className="empty-div"></div>
            {selectedTasks.length && <TaskToolsModal />}
          

        </section>
    )

}

function DynamicCmp({ cmp, info, onUpdate }) {
    switch (cmp) {
        case "status-picker":
            return <StatusPicker info={info} onUpdate={onUpdate} />
        case "member-picker":
            return <MemberPicker info={info} onUpdate={onUpdate} />
        case "date-picker":
            return <DueDate info={info} onUpdate={onUpdate} />
        case "priority-picker":
            return <PriorityPicker info={info} onUpdate={onUpdate} />
        default:
            return <p>UNKNOWN {cmp}</p>
    }
}