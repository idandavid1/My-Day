import { useSelector } from "react-redux"

export function StatusPicker({ info, onUpdate }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    if (!info?.status) return <div className="picker empty-label"></div>

    const label = board.labels.find(label => label.title === info.status)
    const color = label.color

    return <section className="status-picker picker label" style={{ backgroundColor: color }}>
        <div>{info.status}</div>
    </section>
}