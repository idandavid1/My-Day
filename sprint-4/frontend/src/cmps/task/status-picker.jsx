import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { ModalStatusPriority } from "../modal-status-priority"

export function StatusPicker({ info, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [position, setPosition] = useState({ x: 0, y: 0 })


    const board = useSelector(storeState => storeState.boardModule.board)
    if (!info.status ) return <div className="picker empty-label"></div>

    const label = board.labels.find(label => label.title === info.status)
    const color = label.color

    return <section  onMouseDown={(ev) => setPosition({x:ev.pageX, y:ev.pageY})} className="status-picker picker label" style={{ backgroundColor: color }}>
        <div onClick={() => setIsModalOpen(true)}>{info.status}</div>
        {isModalOpen && <ModalStatusPriority labels={board.labels} onUpdate={onUpdate} position={position} setIsModalOpen={setIsModalOpen} />}
    </section>
}