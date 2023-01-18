import { useEffect, useState } from "react"
import { groupService } from "../../services/group.service"
import { TaskService } from "../../services/task.service"
import { TaskPreview } from "../task/task-preview"
import { MdKeyboardArrowDown } from 'react-icons/md'


export function GroupPreview({ groupId }) {
    const [tasks, setTasks] = useState(null)
    const [group, setGroup] = useState(null)
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

    if (!tasks) return <div>Loading...</div>
    return <ul className="group-preview" >
        <div className="group-title" style={{ color: group.color }}>
            <MdKeyboardArrowDown className="arrow-icon" />
            <h4>{group.title}</h4>
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
        </div >
    </ul>
}
