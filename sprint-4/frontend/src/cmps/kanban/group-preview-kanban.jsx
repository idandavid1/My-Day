import { useRef, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { MdKeyboardArrowDown } from 'react-icons/md'
import { useSelector } from 'react-redux'
import { boardService } from '../../services/board.service'
import { addTask, updateGroupAction, updatePickerCmpsOrder } from '../../store/board.actions'
import { TitleGroupPreview } from '../board/title-group-preview'
import { TaskListKanban } from './task-list-kanban'
import { TaskPreviewKanban } from './task-preview-kanban'

export function GroupPreviewKanban({ group, board, index }) {

    const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())
    const user = useSelector(storeState => storeState.userModule.user)
    const taskRef = useRef()
    const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"
    // let _ = require('lodash')

    async function onSave(ev) {
        const value = ev.target.innerText
        group.title = value
        try {
            await updateGroupAction(board, group)
        } catch (err) {
            console.log('Failed to save')
        }
    }
    // Try
    return (
        <section className="group-preview-kanban" >
            <div className={`group-header ${!board.description ? ' not-des' : ''}`}>
                <div className='group-title-container' style={{ backgroundColor: group.color }}>
                    <blockquote className="group-title" contentEditable onBlur={(ev) => onSave(ev)} suppressContentEditableWarning={true}>
                        <span data-title={group.title}>{group.title}</span>
                    </blockquote>
                </div>
            </div>
            <TaskListKanban board={board} group={group} index={index}/>
        </section >
    )
    // original
    // return (
    //     <section className="group-preview-kanban" >
    //         <Draggable key={group.id} draggableId={group.id} index={idx}>
    //             {(provided) => {
    //                 return <div ref={provided.innerRef}
    //                     {...provided.draggableProps}>
    //                     <div {...provided.dragHandleProps} className={`group-header ${!board.description ? ' not-des' : ''}`}>
    //                         <div className='group-title-container' style={{ backgroundColor: group.color }}>
    //                             <blockquote className="group-title" contentEditable onBlur={(ev) => onSave(ev)} suppressContentEditableWarning={true}>
    //                                 <span data-title={group.title}>{group.title}</span>
    //                             </blockquote>
    //                         </div>
    //                     </div>
    //                     <TaskListKanban board={board} group={group}/>
    //                 </div>
    //             }}
    //         </Draggable>
    //     </section >
    // )
}