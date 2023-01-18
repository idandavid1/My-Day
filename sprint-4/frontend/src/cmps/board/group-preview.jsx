import { useEffect, useState } from "react"
import { groupService } from "../../services/group.service"
import { TaskPreview } from "../task/task-preview"

export function GroupPreview({ groupId }) {
    console.log('groupId:', groupId)
    const [group, setGroup] = useState(null)
    useEffect(() => {
        loadGroup()
    }, [])

    async function loadGroup() {
        try {
            const group = await groupService.getById(groupId)
            setGroup(group)
        } catch (err) {
            console.log('err:', err)
        }
    }

    if(!group) return <div>Loading...</div>
    return <ul className="group-preview">
        {group.tasks.map((taskId, idx) => {
            return <li key={idx}>
                <TaskPreview taskId={taskId} />
            </li>
        })}
    </ul>
}
