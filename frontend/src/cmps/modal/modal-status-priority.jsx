import { useSelector } from 'react-redux'

import { setDynamicModalObj } from '../../store/board.actions'
import { RxPencil1 } from 'react-icons/rx'
import { VscTriangleUp } from 'react-icons/vsc'

export function ModalStatusPriority({ dynamicModalObj }) {
    const board = useSelector(storeState => storeState.boardModule.board)

    function onClickModal(labelTitle) {
        dynamicModalObj.activity.action = dynamicModalObj.type
        dynamicModalObj.activity.to = board.labels.find(label => label.title === labelTitle)
        dynamicModalObj.onTaskUpdate(dynamicModalObj.type, labelTitle, dynamicModalObj.activity)
        dynamicModalObj.isOpen = false
        setDynamicModalObj(dynamicModalObj)
    }

    return (
        <section className="modal-status-priority">
            <VscTriangleUp className="triangle-icon" />
            <section className="modal-status-priority-content" >
                <ul>
                    {board.labels.map((label, idx) => <li onClick={() => onClickModal(label.title)} key={idx} style={{ backgroundColor: label.color }}>
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