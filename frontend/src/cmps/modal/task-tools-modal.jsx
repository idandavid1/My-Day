import { duplicateTask, updateGroupAction } from "../../store/board.actions"

import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { FiTrash } from "react-icons/fi"
import { IoCloseOutline } from "react-icons/io5"
import { BsArrowRightCircle } from "react-icons/bs"
import { BsFillCircleFill } from 'react-icons/bs'

export function TaskToolsModal({ tasks, group, board, setSelectedTasks, setIsMainCheckbox }) {
    let _ = require('lodash')

    async function onRemoveTasks() {
        try {
            tasks.forEach(task => {
                const tasksToSave = group.tasks.filter(currTask => task.id !== currTask.id)
                group.tasks = tasksToSave
                updateGroupAction(board, group)
            })
            setSelectedTasks([])
            setIsMainCheckbox({isActive: false})
        } catch (err) {
            console.error(err)
        }
    }

    async function onDuplicateTasks() {
        try {
            tasks.forEach(task => {
                duplicateTask(board, group, task)
            })
            setIsMainCheckbox({isActive: false})
            setSelectedTasks([])
        } catch (err) {
            console.log(err)
        }
    }

    function onClose() {
        setSelectedTasks([])
        setIsMainCheckbox({isActive: false})
    }

    return (
        <section className="task-tools-modal flex">
            <div className="task-tools flex">
                <div className="task-count">
                    {tasks.length}
                </div>
                <div className="tasks-container flex">
                    <div className="task-info flex">
                        <span>Task selected</span>
                        <div className="group-color flex">
                            {_.times(tasks.length, () => <BsFillCircleFill key={_.uniqueId('KEY_')} className="icon" style={{ color: group.color }} />)}
                        </div>
                    </div>
                    <div className="task-btns flex">
                        <div onClick={onDuplicateTasks}>
                            <HiOutlineDocumentDuplicate className="icon" />
                            Duplicate
                        </div>
                        <div onClick={onRemoveTasks}>
                            <FiTrash className="icon" />
                            Delete
                        </div>
                        <div>
                            <BsArrowRightCircle className="icon" />
                            Move to
                        </div>
                    </div>
                    <div className="close-btn" onClick={onClose}>
                        <IoCloseOutline className="icon" />
                    </div>
                </div>
            </div>
        </section>
    )
}