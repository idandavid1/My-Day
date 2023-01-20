import { useEffect, useState } from "react"

import { TaskService } from "../../services/task.service"
import { TaskPreview } from "../task/task-preview"

import { MdKeyboardArrowDown } from 'react-icons/md'
import { addTask, removeGroup, updateAction } from "../../store/board.actions"

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiOutlinePlus} from 'react-icons/ai'
import { GroupMenuModal } from "../group-menu-modal"

export function GroupPreview({ group, board }) {
    const [taskToEdit, setTaskToEdit] = useState(TaskService.getEmptyTask())
    const titles = ['Task', 'Person', 'Status', 'Date', 'Priority']
    const [isModalOpen, setIsModalOpen] = useState(false)

    function onOpenModal() {
        setIsModalOpen(!isModalOpen)
    }

    async function onSave(ev) {
        const value = ev.target.innerText
        group.title = value
        try {
            updateAction(board)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setTaskToEdit((prevTask) => ({ ...prevTask, [field]: value }))
    }

    function onAddTask(ev) {
        ev.preventDefault()
        if (!taskToEdit.title) return
        addTask(taskToEdit, group, board)
        setTaskToEdit(TaskService.getEmptyTask())
    }

    function onRemoveGroup(groupId){
        const groups = board.groups.filter(group => group.id !== groupId)
        removeGroup(groups , board)
    }

    return <ul className="group-preview" >
        {isModalOpen &&
        <GroupMenuModal onRemoveGroup={onRemoveGroup} groupId ={group.id} setIsModalOpen={setIsModalOpen} />
        }
        <div className="group-title" style={{ color: group.color }}>
             <div className="group-menu">
                <BiDotsHorizontalRounded className="icon" onClick={onOpenModal}/>
            </div>

            <MdKeyboardArrowDown className="arrow-icon" />
            <blockquote contentEditable onBlur={onSave} suppressContentEditableWarning={true}>
                <h4>{group.title}</h4>
            </blockquote>
        </div>
        <div className="group-preview-content" style={{ borderColor: group.color}}>
            <div className='title-container'>
                <div className="check-box" >
                    <input type="checkbox" />
                </div>
                {titles.map((title, idx) => <li className={title + ' title'} key={idx}>{title}</li>)}
                <div className="add-picker-task">
                    <span>
                        <AiOutlinePlus />
                    </span>
                </div>
            </div>
            {group.tasks.map((task, idx) => {
                return <li key={idx}>
                    <TaskPreview task={task} color={group.color} />
                </li>
            })}
            <div className="add-task flex">
                <div className="check-box add-task">
                    <input type="checkbox" />
                </div>
                <form onSubmit={onAddTask} className="add-task-form">
                    <input type="text"
                        name="title"
                        value={taskToEdit.title}
                        placeholder="+ Add Task"
                        onChange={handleChange}
                        onBlur={onAddTask} />
                </form>
            </div>
        </div>
    </ul>
}
