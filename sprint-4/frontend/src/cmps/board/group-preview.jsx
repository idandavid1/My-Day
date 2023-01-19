import { useEffect, useState } from "react"

import { groupService } from "../../services/group.service"
import { TaskService } from "../../services/task.service"
import { TaskPreview } from "../task/task-preview"

import { MdKeyboardArrowDown } from 'react-icons/md'
import { addTask } from "../../store/board.actions"

export function GroupPreview({ groupId , board}) {
    const [tasks, setTasks] = useState(null)
    const [group, setGroup] = useState(null)
    const [taskToEdit , setTaskToEdit] = useState(TaskService.getEmptyTask())
    const titles = ['Task', 'Person', 'Status', 'Date', 'Priority']
    
    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {
        try {
            const group = await groupService.getById(groupId)
            let tasks = group.tasks.map((taskId) => TaskService.getById(taskId))
            tasks = await Promise.all(tasks)
            setGroup(group)
            setTasks(tasks)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onSave(ev) {
        const value = ev.target.innerText
        group.title = value
        try {
            groupService.save(group)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    async function onAddTask(ev){
        const title = ev.target.value
        const taskToSave ={...taskToEdit , title}
        try {
            const group = await addTask(taskToSave , groupId , board)
            setGroup(group)
            // setTaskToEdit({title:''})
        } catch(err) {
            console.log('Failed to add task',err)
        }
    }

    if (!tasks) return <div>Loading...</div>
    return <ul className="group-preview" >
        <div className="group-title" style={{ color: group.color }}>
            <MdKeyboardArrowDown className="arrow-icon" />
            <blockquote contentEditable onBlur={onSave} suppressContentEditableWarning={true}>
                <h4>{group.title}</h4>
            </blockquote>
        </div>
        <div className="group-preview-content" style={{ borderColor: group.color }}>
            <div className='title-container'>
                <div className="check-box">
                    <input type="checkbox" />
                </div>
                {titles.map((title, idx) => <li className={title + ' title'} key={idx}>{title}</li>)}
            </div>
            {tasks.map((task, idx) => {
                return <li key={idx}>
                    <TaskPreview task={task} />
                </li>
            })}
            <div className="add-task flex">
                <div className="check-box add-task">
                    <input type="checkbox" />
                </div>
                <div className="add-task-input">

                    <input type="text"
                    // value={taskToEdit.title}
                    placeholder="+ Add Task"
                    onBlur={onAddTask} />
                </div>
            </div>
        </div>
    </ul>
}
