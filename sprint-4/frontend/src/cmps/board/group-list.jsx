import { GroupPreview } from './group-preview.jsx'

export function GroupList({ board }) {
    // const titles = ['Task', 'Person', 'Status', 'Date', 'Priority']
    return (
        <section className="group-list">
            <ul>
                
                {board.groups.map((groupId, idx) => {
                    return <li key={idx}><GroupPreview groupId={groupId} /></li>
                })}
            </ul>
        </section>
    )
}