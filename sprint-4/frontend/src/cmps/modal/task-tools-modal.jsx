import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { FiTrash } from "react-icons/fi"
import { IoCloseOutline } from "react-icons/io5"
import { BsArrowRightCircle } from "react-icons/bs"
import { BsFillCircleFill } from 'react-icons/bs'

export function TaskToolsModal({ tasks, group }) {
    var _ = require('lodash')
    return (

        <section className="task-tools-modal">
            <div className="task-tools">
                <div className="task-count">
                    {tasks.length}
                </div>
                <div className="task-info">
                    <span>Task selected</span>
                    <div className="group-color">
                        {_.times(tasks.length, () => <BsFillCircleFill key={_.uniqueId('KEY_')} className="icon" style={{ color: group.color }} />)}
                    </div>

                </div>
                <div className="task-btns">
                    <div>
                        <HiOutlineDocumentDuplicate className="icon" />
                        Duplicate
                    </div>
                    <div>
                        <FiTrash className="icon" />
                        Delete
                    </div>
                    <div>
                        <BsArrowRightCircle className="icon" />
                        Move to
                    </div>
                    <div className="close-btn">
                        <IoCloseOutline className="icon" />
                    </div>

                </div>
            </div>
        </section>
    )
}