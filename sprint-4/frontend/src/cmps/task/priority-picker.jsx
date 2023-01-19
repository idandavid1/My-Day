import { useState } from "react"
import { useSelector } from "react-redux"
import { ModalStatusPriority } from "../modal-status-priority"

export function PriorityPicker({ info, onUpdate }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    function onClick(ev) {
        setPosition({x:ev.pageX, y:ev.pageY})
        setIsModalOpen(true)
    }

    const label = board.labels.find(label => label.title === info.priority)
    const color = label ? label.color : '#c4c4c4'
    
    return <section className="priority-picker picker label" style={{ backgroundColor: color }}>
        <div className={!info.priority ? 'picker empty-label' : ''} onClick={onClick}>{info.priority}</div>
        {isModalOpen && <ModalStatusPriority labels={board.labels} onUpdate={onUpdate} position={position} setIsModalOpen={setIsModalOpen} cmpType={'priority'}/>}
    </section>
}