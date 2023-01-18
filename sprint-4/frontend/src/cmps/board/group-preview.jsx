import { TaskPreview } from "../task/task-preview"

export function GroupPreview({ group }) {

    return <ul className="group-preview">
        {group.tasks.map(task => {
            return <li key={task.id}>
                <TaskPreview task={task} />
            </li>
        })}
    </ul>
}
