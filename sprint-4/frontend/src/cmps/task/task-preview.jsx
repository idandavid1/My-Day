import { useEffect, useRef, useState } from "react"
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
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { useEffectUpdate } from "../../customHooks/useEffectUpdate"
import { NumberPicker } from "./number-picker"
import { FilePicker } from "./file-picker"
import { UpdatedPicker } from "./updated-picker"

export function TaskPreview({ task, group, board, handleCheckboxChange, isMainCheckbox }) {
    const elTaskPreview = useRef(null)
    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
    const user = useSelector(storeState => storeState.userModule.user)
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)
    const navigate = useNavigate()
    const [isClick, setIsClick] = useState(false)
    const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"
    
    useEffect(() => {
        setIsClick(isMainCheckbox.isActive)
    }, [isMainCheckbox])

    async function updateTask(cmpType, data, activity) {
        const taskToUpdate = structuredClone(task)
        taskToUpdate[cmpType] = data
        taskToUpdate.updatedBy.date = Date.now()
        taskToUpdate.updatedBy.imgUrl = (user && user.imgUrl) || guest
        try {
            await updateTaskAction(board, group.id, taskToUpdate, activity)
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

    function onCheckBoxChange() {
        handleCheckboxChange(task)
        setIsClick(!isClick)
    }

    return (
        <section className={`task-preview ${isTaskModalOpen ? ' modal-open' : ''}`} ref={elTaskPreview}>
            <div className="sticky-div" style={{ borderColor: group.color }}>
                {isTaskModalOpen && <TaskMenuModal taskId={task.id} onRemoveTask={onRemoveTask} onDuplicateTask={onDuplicateTask}
                    onOpenModal={onOpenModal} onCreateNewTaskBelow={onCreateNewTaskBelow} />}
                <div className="task-menu">
                    <BiDotsHorizontalRounded className="icon" onClick={() => setIsTaskModalOpen(!isTaskModalOpen)} />
                </div>
                <div className="check-box">
                    <input type="checkbox" checked={isClick} onChange={onCheckBoxChange} />
                </div>
                <div className="task-title picker" onClick={() => elTaskPreview.current.classList.toggle('on-typing')}>
                    <blockquote contentEditable onBlur={onUpdateTaskTitle} suppressContentEditableWarning={true}>
                        <span>{task.title}</span>
                    </blockquote>
                    <div className="open-task-details" onClick={onOpenModal}>
                        <TbArrowsDiagonal />
                        <span className="open-btn">Open</span>
                    </div>
                    <div onClick={onOpenModal} className="chat-icon">
                        {task.comments.length > 0 && <div>
                            <HiOutlineChatBubbleOvalLeft className="comment-chat" />
                            <div className="count-comment">{task.comments.length}</div>
                        </div>}
                        {task.comments.length === 0 && <BiMessageRoundedAdd className="icon" />}
                    </div>
                </div>
            </div>
            {board.cmpsOrder.map((cmp, idx) => {
                return (
                    <DynamicCmp
                        cmp={cmp}
                        key={cmp}
                        info={task}
                        onUpdate={updateTask}
                    />)
            })}
            <div className="empty-div"></div>
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
        case "number-picker":
            return <NumberPicker info={info} onUpdate={onUpdate} />
        case "file-picker": {
            return <FilePicker info={info} onUpdate={onUpdate} />
        }
        case "updated-picker":
            return <UpdatedPicker info={info} onUpdate={onUpdate} />
        default:
            return <p>UNKNOWN {cmp}</p>
    }
}