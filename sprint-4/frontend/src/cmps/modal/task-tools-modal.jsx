import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { FiTrash } from "react-icons/fi"
import { IoCloseOutline } from "react-icons/io5"
import { BsArrowRightCircle } from "react-icons/bs"
import { BsFillCircleFill } from 'react-icons/bs'
import { duplicateTask, updateGroupAction } from "../../store/board.actions"
import { useState } from "react"
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { forEach } from "lodash"

export function TaskToolsModal({ tasks, group, board, setSelectedTasks }) {
    let _ = require('lodash')

    async function onRemoveTasks() {
        try {
            tasks.forEach(task => {
                const tasksToSave = group.tasks.filter(currTask => task.id !== currTask.id)
                group.tasks = tasksToSave
                updateGroupAction(board, group)
            })
            setSelectedTasks([])
        } catch (err) {
            console.error(err)
        }

    }



    async function onDuplicateTasks() {
        try {
            tasks.forEach(task => {
                duplicateTask(board, group, task)
            })
            setSelectedTasks([])
        } catch (err) {
            console.log(err)
        }
    }

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
                <div className="task-btns" onClick={onDuplicateTasks}>
                    <div>
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
                    <div className="close-btn">
                        <IoCloseOutline className="icon" />
                    </div>

                </div>
            </div>
        </section>
    )
}