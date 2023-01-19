import { RxPencil1 } from 'react-icons/rx'

export function ModalStatusPriority({ labels, onUpdate, position, setIsModalOpen, cmpType }) {

    function onClickModal(labelTitle) {
        console.log('test')
        onUpdate(cmpType, labelTitle)
        setIsModalOpen(false)
    }

    return (
        <section className="modal-status-priority" style={{ top: position.y, left: position.x }}>
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
        </section >
    )
}