import { useState } from "react"
import { Draggable } from "react-beautiful-dnd"

import { TaskPreview } from "../task/task-preview"
import { addTask, saveBoard, updateGroupAction, updateGroups } from "../../store/board.actions"
import { GroupMenuModal } from "../modal/group-menu-modal"
import { utilService } from "../../services/util.service"
import { boardService } from "../../services/board.service"

import { MdKeyboardArrowDown } from 'react-icons/md'
import { BsFillCircleFill } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

export function GroupPreview({ group, board, idx }) {
    const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())
    const titles = ['Task', 'Person', 'Status', 'Date', 'Priority']
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isShowColorPicker, setIsShowColorPicker] = useState(false)

    function onOpenModal() {
        setIsModalOpen(!isModalOpen)
    }

    async function onSave(ev) {
        const value = ev.target.innerText
        group.title = value
        try {
            await updateGroupAction(board, group)
            setIsModalOpen(false)
            setIsShowColorPicker(false)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setTaskToEdit((prevTask) => ({ ...prevTask, [field]: value }))
    }

    function onAddTask(ev) {
        ev.preventDefault()
        if (!taskToEdit.title) return
        taskToEdit.id = utilService.makeId()
        addTask(taskToEdit, group, board)
        setTaskToEdit(boardService.getEmptyTask())
    }

    function onRemoveGroup(groupId) {
        setIsModalOpen(!isModalOpen)
        const groups = board.groups.filter(group => group.id !== groupId)
        updateGroups(groups, board)
    }

    function onDuplicateGroup() {
        setIsModalOpen(!isModalOpen)
        const duplicatedGroup = structuredClone(group)
        duplicatedGroup.id = utilService.makeId()
        board.groups.push(duplicatedGroup)
        saveBoard(board)
    }

    function onShowPalette() {
        setIsShowColorPicker(true)
        setIsModalOpen(true)
    }

    function onChangeGroupColor(color) {
        group.color = color
        saveBoard(board)
        setIsModalOpen(false)
    }

    return <ul className="group-preview" >
        {isModalOpen &&
            <GroupMenuModal onRemoveGroup={onRemoveGroup} onDuplicateGroup={onDuplicateGroup}
                onChangeGroupColor={onChangeGroupColor} isShowColorPicker={isShowColorPicker}
                groupId={group.id} setIsModalOpen={setIsModalOpen} />}
        <Draggable key={idx} draggableId={group.id + idx} index={idx}>
            {(provided) => {
                return <div ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <div className="group-menu">
                        <BiDotsHorizontalRounded className="icon" onClick={onOpenModal} />
                    </div>
                    <div className="group-header" style={{ color: group.color }}>
                        <MdKeyboardArrowDown className="arrow-icon" />
                        <div className="group-header-title">
                            <blockquote contentEditable onBlur={(ev) => onSave(ev)} onFocus={() => setIsShowColorPicker(true)} suppressContentEditableWarning={true}>
                                {isShowColorPicker && <BsFillCircleFill onClick={onShowPalette} />}
                                <h4>{group.title}</h4>
                            </blockquote>
                        </div>
                    </div>
                    <div className="group-preview-content" style={{ borderColor: group.color }}>
                        <div className='title-container'>
                            <div className="check-box" >
                                <input type="checkbox" />
                            </div>
                            {titles.map((title, idx) => <li className={title + ' title'} key={idx}>{title}</li>)}
                            <div className="add-picker-task">
                                <span>
                                    <AiOutlinePlus />
                                </span>
                            </div>
                        </div>
                        {group.tasks.map((task, idx) => {
                            return <li key={idx}>
                                <TaskPreview task={task} groupId={group.id} board={board} />
                            </li>
                        })}
                        <div className="add-task flex">
                            <div className="check-box add-task">
                                <input type="checkbox" disabled />
                            </div>
                            <form onSubmit={onAddTask} className="add-task-form">
                                <input type="text"
                                    name="title"
                                    value={taskToEdit.title}
                                    placeholder="+ Add Task"
                                    onChange={handleChange}
                                    onBlur={onAddTask} />
                            </form>
                        </div>
                    </div>
                </div>
            }}
        </Draggable>
    </ul >
}
