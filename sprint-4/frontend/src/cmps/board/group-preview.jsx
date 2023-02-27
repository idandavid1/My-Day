import { useState , useRef } from "react"
import { useSelector } from "react-redux"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { TaskPreview } from "../task/task-preview"
import { addTask, updateGroupAction, updatePickerCmpsOrder, addActivity, setDynamicModalObj } from "../../store/board.actions"
import { boardService } from "../../services/board.service"

import { TaskToolsModal } from "../modal/task-tools-modal"
import { TitleGroupPreview } from "./title-group-preview"
import { StatisticGroup } from "./statistics-group"

import { MdKeyboardArrowDown } from 'react-icons/md'
import { BsFillCircleFill } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'

export function GroupPreview({ group, board, idx }) {
    const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())
    const [isTyping, setIsTyping] = useState(false)
    const [isShowColorPicker, setIsShowColorPicker] = useState(false)
    const [selectedTasks, setSelectedTasks] = useState([])
    const [isMainCheckbox, setIsMainCheckbox] = useState({ isActive: false })

    const dynamicModalObj = useSelector(storeState => storeState.boardModule.dynamicModalObj)
    const user = useSelector(storeState => storeState.userModule.user)

    const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"
    const taskRef = useRef()
    const elMainGroup = useRef()
    const elAddColumn = useRef()

    function onToggleMenuModal() {
        const isOpen = dynamicModalObj?.group?.id === group.id && dynamicModalObj?.type === 'menu-group' ? !dynamicModalObj.isOpen : true
        const { x, y, height, width } = elMainGroup.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x + width / 2), y: (y + height) }, type: 'menu-group', group: group })
    }

    function onTogglePalette() {
        const isOpen = dynamicModalObj?.group?.id === group.id && dynamicModalObj?.type === 'palette-modal' ? !dynamicModalObj.isOpen : true
        const { x, y, height, width } = elMainGroup.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x + width / 2), y: (y + height) }, type: 'palette-modal', group: group })
    }

    function toggleColumnModal() {
        const isOpen = dynamicModalObj?.group?.id === group.id && dynamicModalObj?.type === 'add-column' ? !dynamicModalObj.isOpen : true
        const { x, y, height } = elAddColumn.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x - 225 ), y: (y + height) }, type: 'add-column', group })
    }

    async function onSave(ev) {
        const value = ev.target.innerText
        group.title = value
        try {
            await updateGroupAction(board, group)
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
        taskToEdit.updatedBy.date = Date.now()
        taskToEdit.updatedBy.imgUrl = user?.imgUrl || guest
        addTask(taskToEdit, group, board, activity)
        setTaskToEdit(boardService.getEmptyTask())
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
        if (isMainCheckbox.isActive) setSelectedTasks([])
        else setSelectedTasks(group.tasks)
        setIsMainCheckbox({ isActive: !isMainCheckbox.isActive })
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

    function getAddColumnClassName() {
        return dynamicModalObj.isOpen === true && dynamicModalObj.type === 'add-column' && dynamicModalObj?.group?.id === group.id
    }

    return <ul className="group-preview flex column" >
        <Draggable key={group.id} draggableId={group.id} index={idx}>
            {(provided) => {
                return <div ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div {...provided.dragHandleProps} className={`group-header flex align-center ${!board.description ? ' not-des' : ''}`} style={{ color: group.color }}>
                        <div className="group-header-title flex align-center">
                            <MdKeyboardArrowDown className="arrow-icon" />
                            <div className="group-menu" ref={elMainGroup}>
                                <BiDotsHorizontalRounded className="icon" onClick={onToggleMenuModal} />
                            </div>
                            <div className={`group-title-info flex align-center ${isShowColorPicker ? 'showBorder' : ''} `} onFocus={() => setIsShowColorPicker(true)}>
                                {isShowColorPicker && <BsFillCircleFill onClick={onTogglePalette} />}
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
                                                            <TitleGroupPreview title={title} group={group} board={board} />
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )}
                                        <div ref={elAddColumn} className="add-picker-task flex align-items" onClick={toggleColumnModal}>
                                            <span className={`add-btn ${getAddColumnClassName() ? 'active' : ''}`}>
                                                <AiOutlinePlus className={`${getAddColumnClassName() ? 'plus' : 'close'}`} />
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
                                                        return <li ref={provided.innerRef}{...provided.draggableProps} {...provided.dragHandleProps} key={idx}>
                                                            <TaskPreview task={task} group={group} board={board} handleCheckboxChange={handleCheckboxChange} isMainCheckbox={isMainCheckbox} />
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
                                            <StatisticGroup cmpType={cmpType} board={board} group={group} />
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
