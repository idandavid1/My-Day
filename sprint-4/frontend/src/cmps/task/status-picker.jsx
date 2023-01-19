import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ModalStatusPriority } from "../modal-status-priority"

export function StatusPicker({ info, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })

    function onClick(ev) {
        setPosition({x:ev.pageX, y:ev.pageY})
        setIsModalOpen(true)
    }

    const board = useSelector(storeState => storeState.boardModule.board)

    const label = board.labels.find(label => label.title === info.status)
    const color = label ? label.color : '#c4c4c4'

    return <section className="status-picker picker label" style={{ backgroundColor: color }}>
        <div className={!info.status ? 'picker empty-label' : ''} onClick={onClick}>{info.status}</div>
        {isModalOpen && <ModalStatusPriority labels={board.labels} onUpdate={onUpdate} position={position} setIsModalOpen={setIsModalOpen} cmpType={'status'}/>}
    </section>
}