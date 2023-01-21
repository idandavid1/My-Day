import { useRef, useState } from "react"
import { Link, NavLink, useNavigate, useParams } from "react-router-dom"
import { useSelector } from "react-redux"

import { DueDate } from "./date-picker"
import { MemberPicker } from "./member-picker"
import { PriorityPicker } from "./priority-picker"
import { StatusPicker } from "./status-picker"
import { updateAction } from "../../store/board.actions"

import { TbArrowsDiagonal } from 'react-icons/tb'
import { BiMessageRoundedAdd } from 'react-icons/bi'
import { DragDropContext } from 'react-beautiful-dnd'

import { BoardModal } from "../board/board-modal"

export function TaskPreview({ task , groupId}) {
    const [UpdateCurrTask, setUpdateCurrTask] = useState(task)
    const [isOpenModal , setIsOpenModal] = useState(false)
    const elTaskPreview = useRef(null)
    const board = useSelector(storeState => storeState.boardModule.board)
    const params = useParams()
    //TODO:GET FROM STORE
    const cmpsOrder = [
        "member-picker",
        "status-picker",
        "date-picker",
        "priority-picker",
    ]

    async function updateTask(cmpType, data) {
        task[cmpType] = data
        try {
            await updateAction(board)
            setUpdateCurrTask({ ...task })
        } catch (err) {
            console.log(err)
        }
    }

    async function onUpdateTaskTitle(ev) {
        const value = ev.target.innerText
        task.title = value
        try {
            elTaskPreview.current.classList.toggle('on-typing')
            await updateAction(board)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    function closeModal() {
        setIsOpenModal(false)
    }
    return (
        <section className="task-preview" ref={elTaskPreview}>
            <div className="check-box">
                <input type="checkbox" />
            </div>
            <div className="task-title picker" onClick={() => elTaskPreview.current.classList.toggle('on-typing')}>
                <blockquote contentEditable onBlur={onUpdateTaskTitle} suppressContentEditableWarning={true}>
                    <span>{UpdateCurrTask.title}</span>
                </blockquote>
                <div className="open-task-details">
                    <TbArrowsDiagonal />
                    <span onClick={() => showModal('open-modal')}>Open</span>
                </div>
                <div className="chat-icon">
                    <BiMessageRoundedAdd className="icon" />
                </div>
            </div>
            {cmpsOrder.map((cmp, idx) => {
                return (
                    <DynamicCmp
                        cmp={cmp}
                        key={idx}
                        info={UpdateCurrTask}
                        onUpdate={updateTask}
                    />
                )
            })}
            <div className="empty-div"></div>
            <BoardModal />
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