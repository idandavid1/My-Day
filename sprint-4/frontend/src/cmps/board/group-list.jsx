import { GroupPreview } from './group-preview'

export function GroupList({ board }) {
    return (
        <section className="group-list">
            <ul>
                {board.groups.map((groupId, idx) => {
                    return <li key={idx}><GroupPreview groupId={groupId}/></li>
                })}
            </ul>
        </section>
    )
}