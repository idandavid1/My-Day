import { RxPencil1 } from 'react-icons/rx'
import { VscTriangleUp } from 'react-icons/vsc'
import { useSelector } from 'react-redux'

export function ModalStatusPriority({ labels, onUpdate, setIsModalOpen, cmpType, activity }) {
    const board = useSelector(storeState => storeState.boardModule.board)

    function onClickModal(labelTitle) {
        activity.action = cmpType
        activity.to = board.labels.find(label => label.title === labelTitle)
        onUpdate(cmpType, labelTitle, activity)
        setIsModalOpen(false)
    }

    return (
        <section className="modal-status-priority">
            <VscTriangleUp className="triangle-icon"/>
            <section className="modal-status-priority-content" >
                <ul>
                    {labels.map((label, idx) => <li onClick={() => onClickModal(label.title)} key={idx} style={{ backgroundColor: label.color }}>
                        {label.title}
                    </li>)}
                </ul>
                <div className="edit-labels-btn">
                    <button>
                        <RxPencil1 className='icon' />
                        <span>Edit Labels</span>
                    </button>
                </div>
            </section>
        </section>
    )
}