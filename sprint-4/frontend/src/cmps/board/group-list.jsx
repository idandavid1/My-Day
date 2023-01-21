import { GroupPreview } from './group-preview'
import { DragDropContext } from 'react-beautiful-dnd'

export function GroupList({ board }) {
    return (
        <DragDropContext>
            <section className="group-list">
                <ul>
                    {board.groups.map((group, idx) => {
                        return <li key={idx}><GroupPreview group={group} board={board} /></li>
                    })}
                </ul>
            </section>
        </DragDropContext>
    )
}