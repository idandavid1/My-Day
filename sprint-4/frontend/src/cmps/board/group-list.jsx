import { GroupPreview } from './group-preview.jsx'

export function GroupList({ board }) {
    const titles = ['Task', 'Person', 'Status', 'Date', 'Priority']

    return (
        <section className="group-list">
            <ul>

                <div className='title-container'>
                    <input type="checkbox" />
                    {titles.map((title, idx) => <li className={title + ' title'} key={idx}>{title}</li>)}
                </div>
                {board.groups.map((groupId, idx) => {
                    return <li key={idx}><GroupPreview groupId={groupId} /></li>
                })}
            </ul>
        </section>
    )
}