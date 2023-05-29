import { useRef, useState } from "react"
import { useSelector } from "react-redux"
import { boardService } from "../../services/board.service"
import { setDynamicModalObj } from "../../store/board.actions"

export function StatusPicker({ info, onUpdate }) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const dynamicModalObj = useSelector(storeState => storeState.boardModule.dynamicModalObj)
    const elStatusSection = useRef()
    let classText = !info.status ? 'empty-label ' : ''
    classText += 'label-text'
    const board = useSelector(storeState => storeState.boardModule.board)
    const activity = boardService.getEmptyActivity()

    const label = board.labels.find(label => label.title === info.status)
    const color = label ? label.color : '#c4c4c4'
    activity.from = label
    activity.task = { id: info.id, title: info.title }

    function onToggleMenuModal() {
        const isOpen = dynamicModalObj?.task?.id === info.id && dynamicModalObj?.type === 'status' ? !dynamicModalObj.isOpen : true
        const { x, y } = elStatusSection.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x - 35), y: (y + 38) }, type: 'status', task: info, onTaskUpdate: onUpdate, activity: activity })
    }

    return (
        <section ref={elStatusSection} className="status-priority-picker picker" style={{ backgroundColor: color }} onClick={onToggleMenuModal}>
            <div className={classText}>{info.status}</div>
            {!isModalOpen && <span className="fold"></span>}
            {/* {isModalOpen && <ModalStatusPriority labels={board.labels} onUpdate={onUpdate} setIsModalOpen={setIsModalOpen} cmpType={'status'} activity={activity}/>} */}
        </section>
    )

}