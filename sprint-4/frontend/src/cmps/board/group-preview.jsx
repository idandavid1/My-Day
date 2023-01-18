import { TaskPreview } from "../task/task-preview"





export function GroupPreview({ group }) {

    return <section className="group-preview">
        <ul>
            {group.tasks.map(task => {
                return <li key={task.id}>
                    <TaskPreview task={task} />
                </li>
            })}
        </ul>
    </section>
}
