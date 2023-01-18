import { useEffect, useState } from "react"
import { groupService } from "../../services/group.service"
import { TaskService } from "../../services/task.service"
import { TaskPreview } from "../task/task-preview"

export function GroupPreview({ groupId }) {
    const [tasks, setTasks] = useState(null)
    useEffect(() => {
        loadTasks()
    }, [])

    async function loadTasks() {
        try {
            const groups = await groupService.getById(groupId)
            let tasks = groups.tasks.map((taskId) => TaskService.getById(taskId))
            tasks = await Promise.all(tasks)
            setTasks(tasks)
        } catch (err) {
            console.log('err:', err)
        }
    }

    if(!tasks) return <div>Loading...</div>
    return <ul className="group-preview">
        {tasks.map((task, idx) => {
            return <li key={idx}>
                <TaskPreview task={task} />
            </li>
        })}
    </ul>
}
