import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { TaskPreview } from "../task/task-preview"
import { addTask, saveBoard, updateGroupAction, updateGroups, updatePickerCmpsOrder, duplicateGroup, addActivity, loadBoard } from "../../store/board.actions"
import { GroupMenuModal } from "../modal/group-menu-modal"
import { boardService } from "../../services/board.service"

import { MdKeyboardArrowDown } from 'react-icons/md'
import { BsFillCircleFill } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

import { useRef } from "react"
import { TaskToolsModal } from "../modal/task-tools-modal"
import { AddColumnModal } from "../modal/add-column-modal"
import { TitleGroupPreview } from "./title-group-preview"
import { useSelector } from "react-redux"
import { StatisticGroup } from "./statistics-group"

export function GroupPreview({ group, board, idx }) {
    const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())
    const user = useSelector(storeState => storeState.userModule.user)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [isShowColorPicker, setIsShowColorPicker] = useState(false)
    const taskRef = useRef()
    const [isMainCheckbox, setIsMainCheckbox] = useState({isActive: false})
    const [selectedTasks, setSelectedTasks] = useState([])
    
    const [isPlus, setIsPlus] = useState(true)
    const [isDeleteCmpTitleModalOpen, setIsDeleteCmpTitleModalOpen] = useState(false)
    const [isActive, setIsActive] = useState(false)
    const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"
    let _ = require('lodash')

    function onOpenModal() {
        setIsModalOpen(!isModalOpen)
    }

    async function onSave(ev) {
        const value = ev.target.innerText
        group.title = value
        try {
            await updateGroupAction(board, group)
            setIsModalOpen(false)
            setIsTyping(false)
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
        const activity = boardService.getEmptyActivity()
        activity.from = { color: group.color, title: group.title }
        activity.action = 'create'
        console.log(taskToEdit)
        taskToEdit.updatedBy.date = Date.now()
        taskToEdit.updatedBy.imgUrl = user?.imgUrl || guest
        addTask(taskToEdit, group, board, activity)
        setTaskToEdit(boardService.getEmptyTask())
    }

    function onRemoveGroup(groupId) {
        setIsModalOpen(!isModalOpen)
        updateGroups(groupId, board)
    }

    async function onDuplicateGroup() {
        try {
            setIsModalOpen(!isModalOpen)
            duplicateGroup(board, group)
        } catch (err) {
            console.log('err:', err)
        }
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

    function handleOnDragEnd(ev) {
        const updatedTasks = [...group.tasks]
        const [draggedItem] = updatedTasks.splice(ev.source.index, 1)
        updatedTasks.splice(ev.destination.index, 0, draggedItem)
        group.tasks = updatedTasks
        updateGroupAction(board, group)
    }

    function handleHorizontalDrag(ev) {
        const updatedTitles = [...board.cmpsOrder]
        const [draggedItem] = updatedTitles.splice(ev.source.index, 1)
        updatedTitles.splice(ev.destination.index, 0, draggedItem)
        updatePickerCmpsOrder(board, updatedTitles)
    }

    async function handleCheckboxChange(task) {
        try {
            if (selectedTasks.includes(task)) {
                selectedTasks.splice(selectedTasks.indexOf(task), 1)
                setSelectedTasks((selectedTasks) => ([...selectedTasks]))
                addCheckActivity(true, task)
            } else {
                addCheckActivity(false, task)
                setSelectedTasks((prevTasks) => ([...prevTasks, task]))
            }
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onClickMainCheckbox() {
        if(isMainCheckbox.isActive) setSelectedTasks([])
        else setSelectedTasks(group.tasks)
        setIsMainCheckbox({isActive: !isMainCheckbox.isActive})
    }

    function addCheckActivity(isCheckBoxDown, task) {
        const activity = boardService.getEmptyActivity()
        activity.task = { id: task.id, title: task.title }
        activity.action = 'check'
        activity.from = isCheckBoxDown
        activity.to = !isCheckBoxDown
        addActivity(board, activity)
    }

    function getSumOfTasks() {
        const sum = group.tasks.length
        if (sum > 1) return sum + ' items'
        else if (sum === 1) return 1 + ' item'
        else return 'No items'
    }

    async function addColumn(columnType) {
        try {
            board.cmpsOrder.push(columnType)
            await saveBoard(board)
            loadBoard(board._id)
            setIsPlus(true)
        } catch (err) {
            console.log(err)
        }
    }

    return <ul className="group-preview flex column" >
        {isModalOpen &&
            <GroupMenuModal onRemoveGroup={onRemoveGroup} onDuplicateGroup={onDuplicateGroup}
                onChangeGroupColor={onChangeGroupColor} isShowColorPicker={isShowColorPicker}
                groupId={group.id} setIsModalOpen={setIsModalOpen} />}
        <Draggable key={group.id} draggableId={group.id} index={idx}>
            {(provided) => {
                return <div ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div {...provided.dragHandleProps} className={`group-header flex align-center ${!board.description ? ' not-des' : ''}`} style={{ color: group.color }}>
                        <div className="group-header-title flex align-center">
                            <MdKeyboardArrowDown className="arrow-icon" />
                            <div className="group-menu">
                                <BiDotsHorizontalRounded className="icon" onClick={onOpenModal} />
                            </div>
                            <div className={`group-title-info flex align-center ${isShowColorPicker ? 'showBorder' : ''} `} onFocus={() => setIsShowColorPicker(true)}>
                                {isShowColorPicker && <BsFillCircleFill onClick={onShowPalette} />}
                                <blockquote className="group-title" onFocus={() => setIsTyping(true)} contentEditable onBlur={(ev) => onSave(ev)} suppressContentEditableWarning={true}>
                                    <h4 data-title={group.title}>{group.title}</h4>
                                </blockquote>
                                {!isTyping && <span className="task-count flex align-center">{getSumOfTasks()}</span>}
                            </div>
                        </div>
                    </div>
                    <div className="group-preview-content" >
                        <DragDropContext onDragEnd={handleHorizontalDrag}>
                            <Droppable droppableId="title" direction="horizontal">
                                {(droppableProvided) => {
                                    return <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className={`title-container flex ${!board.description ? ' not-des' : ''}`}>
                                        <div className="sticky-div titles flex" style={{ borderColor: group.color }}>
                                            <div className="hidden"></div>
                                            <div className="check-box"  >
                                                <input type="checkbox" checked={isMainCheckbox.isActive} onChange={onClickMainCheckbox} />
                                            </div>
                                            <div className="task title">Task</div>
                                        </div>
                                        {board.cmpsOrder.map((title, idx) =>
                                            <Draggable key={title} draggableId={title} index={idx}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <li ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps} className={title + ' cmp-order-title title'} key={idx}>
                                                            <TitleGroupPreview title={title} board={board} setModalOpen={setIsDeleteCmpTitleModalOpen}/>
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )}
                                        <div className="add-picker-task flex align-items">
                                            <span onClick={() => setIsActive(!isActive)} className={`add-btn ${isActive ? ' active' : ''}`}>
                                                <AiOutlinePlus onClick={() => setIsPlus(!isPlus)} className={isPlus ? 'plus' : 'close'} />
                                                {!isPlus && <AddColumnModal addColumn={addColumn} board={board} />}
                                            </span>
                                            {/* <div className="empty-div"></div> */}
                                        </div>
                                    </div>
                                }}
                            </Droppable>
                        </DragDropContext>
                        <div ref={taskRef}>
                            <DragDropContext onDragEnd={handleOnDragEnd}>
                                <Droppable droppableId={group.id}>
                                    {(droppableProvided) => {
                                        return <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} >
                                            {group.tasks.map((task, idx) => (
                                                <Draggable key={task.id} draggableId={task.id} index={idx}>
                                                    {(provided) => {
                                                        return <li className={`parent-task-preview ${(!isPlus || isDeleteCmpTitleModalOpen) ? ' add-modal-open' : ''}`} ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps} key={idx}>
                                                            <TaskPreview task={task} group={group} board={board} handleCheckboxChange={handleCheckboxChange} isMainCheckbox={isMainCheckbox}  />
                                                        </li>
                                                    }}
                                                </Draggable>
                                            ))}
                                            {droppableProvided.placeholder}
                                        </div>
                                    }}
                                </Droppable>
                            </DragDropContext>
                        </div>
                        <div className="add-task flex">
                            <div className="sticky-div" style={{ borderColor: group.color }}>
                                <div className="check-box add-task">
                                    <input type="checkbox" disabled />
                                </div>
                                <form onSubmit={onAddTask} className="add-task-form flex align-center">
                                    <input type="text"
                                        name="title"
                                        value={taskToEdit.title}
                                        placeholder="+ Add Task"
                                        onChange={handleChange}
                                        onBlur={onAddTask} />
                                </form>
                            </div>
                            <div className="empty-div"></div>
                        </div>
                        <div className="statistic flex">
                            <div className="sticky-container">
                                <div className="hidden"></div>
                            </div>
                            <div className="statistic-container flex">

                                {board.cmpsOrder.map((cmpType, idx) => {
                                    return (
                                        <div key={idx} className={`title ${idx === 0 ? ' first ' : ''}${cmpType}`}>
                                            <StatisticGroup cmpType={cmpType} board={board} group={group}/>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="empty-div"></div>
                        </div>
                    </div>
                </div>
            }}
        </Draggable>
        {selectedTasks.length > 0 && <TaskToolsModal board={board} tasks={selectedTasks} group={group} setSelectedTasks={setSelectedTasks} setIsMainCheckbox={setIsMainCheckbox} />}
    </ul >
}
