import { updateGroupAction } from '../../store/board.actions'
import { TaskListKanban } from './task-list-kanban'

export function GroupPreviewKanban({ group, board, index }) {

    async function onSave(ev) {
        const value = ev.target.innerText
        group.title = value
        try {
            await updateGroupAction(board, group)
        } catch (err) {
            console.log('Failed to save')
        }
    }
    return (
        <section className="group-preview-kanban" >
            <div className={`group-header ${!board.description ? ' not-des' : ''}`}>
                <div className='group-title-container' style={{ backgroundColor: group.color }}>
                    <blockquote className="group-title" contentEditable onBlur={(ev) => onSave(ev)} suppressContentEditableWarning={true}>
                        <span data-title={group.title}>{group.title}</span>
                    </blockquote>
                </div>
            </div>
            <TaskListKanban board={board} group={group} index={index} />
        </section >
    )
}
