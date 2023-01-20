import { useRef, useState } from "react"

import { DueDate } from "./date-picker"
import { MemberPicker } from "./member-picker"
import { PriorityPicker } from "./priority-picker"
import { StatusPicker } from "./status-picker"

import { BiMessageRoundedAdd } from 'react-icons/bi'
import { useSelector } from "react-redux"
import { updateAction } from "../../store/board.actions"

export function TaskPreview({ task }) {
    const [UpdateCurrTask, setUpdateCurrTask] = useState(task)
    const elTaskPreview = useRef(null)
    const board = useSelector(storeState => storeState.boardModule.board)
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

    return (
        <section className="task-preview" ref={elTaskPreview}>
            <div className="check-box">
                <input type="checkbox" />
            </div>
            <div className="task-title picker" onClick={() => elTaskPreview.current.classList.toggle('on-typing')}>
                <blockquote contentEditable onBlur={onUpdateTaskTitle} suppressContentEditableWarning={true}>
                    <span>{UpdateCurrTask.title}</span>
                </blockquote>
                <div className="chat-icon">
                    <BiMessageRoundedAdd className="icon"/>
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