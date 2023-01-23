import { useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Draggable, DragDropContext, Droppable } from 'react-beautiful-dnd'

import { DueDate } from "./date-picker"
import { MemberPicker } from "./member-picker"
import { PriorityPicker } from "./priority-picker"
import { StatusPicker } from "./status-picker"
import { toggleModal, updateTaskAction } from "../../store/board.actions"

import { TbArrowsDiagonal } from 'react-icons/tb'
import { BiMessageRoundedAdd } from 'react-icons/bi'

export function TaskPreview({ task, groupId, board, idx }) {
    const elTaskPreview = useRef(null)
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)
    const navigate = useNavigate()

    async function updateTask(cmpType, data) {
        task[cmpType] = data
        try {
            await updateTaskAction(board, groupId, task)
        } catch (err) {
            console.log(err)
        }
    }

    async function onUpdateTaskTitle(ev) {
        const value = ev.target.innerText
        task.title = value
        try {
            elTaskPreview.current.classList.toggle('on-typing')
            await updateTaskAction(board, groupId, task)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    function onOpenModal() {
        toggleModal(isOpen)
        navigate(`/board/${board._id}/${groupId}/${task.id}`)
    }

    return (
        <section className="task-preview" ref={elTaskPreview}>

            <div className="check-box">
                <input type="checkbox" />
            </div>
            <div className="task-title picker" onClick={() => elTaskPreview.current.classList.toggle('on-typing')}>
                <blockquote contentEditable onBlur={onUpdateTaskTitle} suppressContentEditableWarning={true}>
                    <span>{task.title}</span>
                </blockquote>
                <div className="open-task-details" onClick={onOpenModal}>
                    <TbArrowsDiagonal />
                    <span>Open</span>
                </div>
                <div className="chat-icon">
                    <BiMessageRoundedAdd className="icon" />
                </div>
            </div>

            {/* {board.cmpsOrder.map((cmp, idx) => {
                <Draggable key={cmp} draggableId={cmp} index={idx}>
                    {(provided, snapshot) => {
                        return <div ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}>
                            <DynamicCmp
                                cmp={cmp}
                                key={idx}
                                info={task}
                                onUpdate={updateTask}
                            />
                        </div>
                    }}
                    </Draggable>

                { droppableProvided.placeholder }
            })} */}
            {/* original */}
            {board.cmpsOrder.map((cmp, idx) => {
                
                return (
                    <DynamicCmp
                        cmp={cmp}
                        key={idx}
                        info={task}
                        onUpdate={updateTask}
                    />)
            })}
            <div className="empty-div"></div>
        </section>
    )

}

function DynamicCmp({ cmp, info, onUpdate }) {
    switch (cmp) {
        case "status-picker":
            return <StatusPicker info={info} onUpdate={onUpdate} />
        case "member-picker":
            return <MemberPicker info={info} onUpdate={onUpdate} />
        case "date-picker":
            return <DueDate info={info} onUpdate={onUpdate} />
        case "priority-picker":
            return <PriorityPicker info={info} onUpdate={onUpdate} />
        default:
            return <p>UNKNOWN {cmp}</p>
    }
}