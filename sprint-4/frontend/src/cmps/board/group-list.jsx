import { GroupPreview } from './group-preview'

export function GroupList({ board }) {
    return (
        <section className="group-list">
            <ul>
                {board.groups.map((group, idx) => {
                    return <li key={idx}><GroupPreview group={group} board={board} /></li>
                })}
            </ul>
        </section>
    )
}