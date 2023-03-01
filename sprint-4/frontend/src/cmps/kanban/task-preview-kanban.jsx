import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { DueDate } from "../task/date-picker"
import { duplicateTask, toggleModal, updateGroupAction, updateTaskAction } from "../../store/board.actions"

import { TbArrowsDiagonal } from 'react-icons/tb'
import { BiDotsHorizontalRounded, BiMessageRoundedAdd } from 'react-icons/bi'
import { TaskMenuModal } from "../modal/task-menu-modal"
import { utilService } from "../../services/util.service"
import { boardService } from "../../services/board.service"
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { NumberPicker } from "../task/number-picker"
import { FilePicker } from "../task/file-picker"
import { UpdatedPicker } from "../task/updated-picker"
import { StatusPicker } from "../task/status-picker"
import { MemberPicker } from "../task/member-picker"
import { PriorityPicker } from "../task/priority-picker"

export function TaskPreviewKanban({ task, group, board , isTaskModalOpen ,setIsTaskModalOpen}) {
    const user = useSelector(storeState => storeState.userModule.user)
    const navigate = useNavigate()
    const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"

    async function updateTask(cmpType, data, activity) {
        task[cmpType] = data
        task.updatedBy.date = Date.now()
        task.updatedBy.imgUrl = (user && user.imgUrl) || guest
        try {
            await updateTaskAction(board, group.id, task, activity)
        } catch (err) {
            console.log(err)
        }
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
 
    return (
        <section className={`task-preview-kanban ${isTaskModalOpen ? ' modal-open' : ''}`}>

            {isTaskModalOpen && <TaskMenuModal taskId={task.id} onRemoveTask={onRemoveTask} onDuplicateTask={onDuplicateTask}
                 onCreateNewTaskBelow={onCreateNewTaskBelow} />}
            
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
        case "file-picker":
            return <FilePicker info={info} onUpdate={onUpdate} />
        case "updated-picker":
            return <UpdatedPicker info={info} onUpdate={onUpdate} />
        default:
            return <p>UNKNOWN {cmp}</p>
    }
}