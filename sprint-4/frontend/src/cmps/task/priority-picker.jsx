import { useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { ModalStatusPriority } from "../modal/modal-status-priority"

export function PriorityPicker({ info, onUpdate }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isModalOpen, setIsModalOpen] = useState(false)

    let classText = !info.priority ? 'empty-label ' : ''
    classText += 'label-text'
    const label = board.labels.find(label => label.title === info.priority)
    const color = label ? label.color : '#c4c4c4'
    const activity = boardService.getEmptyActivity()
    activity.from = label
    activity.task = {id: info.id, title: info.title}
    return <section className="status-priority-picker picker" style={{ backgroundColor: color }}>
        <div className={classText} onClick={() => setIsModalOpen(!isModalOpen)}>{info.priority}</div>
        <span className="fold"></span>
        {isModalOpen && <ModalStatusPriority labels={board.labels} onUpdate={onUpdate} setIsModalOpen={setIsModalOpen} cmpType={'priority'} activity={activity}/>}
    </section>
}