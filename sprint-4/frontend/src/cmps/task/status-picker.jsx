import { useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { ModalStatusPriority } from "../modal/modal-status-priority"

export function StatusPicker({ info, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    let classText = !info.status ? 'empty-label ' : ''
    classText += 'label-text'
    const board = useSelector(storeState => storeState.boardModule.board)
    const activity = boardService.getEmptyActivity()

    const label = board.labels.find(label => label.title === info.status)
    const color = label ? label.color : '#c4c4c4'
    activity.from = label
    activity.task = {id: info.id, title: info.title}
    return (
    <section className="status-priority-picker picker" style={{ backgroundColor: color }}>
        <div className={classText} onClick={() => setIsModalOpen(!isModalOpen)}>{info.status}</div>
        {!isModalOpen && <span className="fold"></span>}
        {isModalOpen && <ModalStatusPriority labels={board.labels} onUpdate={onUpdate} setIsModalOpen={setIsModalOpen} cmpType={'status'} activity={activity}/>}
    </section>
    )
    
}