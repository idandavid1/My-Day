import { RxPencil1 } from 'react-icons/rx'
import { VscTriangleUp } from 'react-icons/vsc'

export function ModalStatusPriority({ labels, onUpdate, setIsModalOpen, cmpType }) {

    function onClickModal(labelTitle) {
        console.log('test')
        onUpdate(cmpType, labelTitle)
        setIsModalOpen(false)
    }
    return (
        <section className="modal-status-priority">
            {/* <div className="triangle-container"><VscTriangleUp className="triangle-icon"/></div> */}
            <VscTriangleUp className="triangle-icon"/>
            <section className="modal-status-priority-content" >
                <ul>
                    {labels.map((label, idx) => <li onClick={() => onClickModal(label.title)} key={idx} style={{ backgroundColor: label.color }}>
                        {label.title}
                    </li>)}
                    <li onClick={() => onClickModal(null)} style={{ backgroundColor: '#c4c4c4' }}></li>
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