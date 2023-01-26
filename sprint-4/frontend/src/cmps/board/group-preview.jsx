import { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

import { TaskPreview } from "../task/task-preview"
import { addTask, saveBoard, updateGroupAction, updateGroups, updatePickerCmpsOrder, duplicateGroup, addActivity } from "../../store/board.actions"
import { GroupMenuModal } from "../modal/group-menu-modal"
import { boardService } from "../../services/board.service"

import { MdKeyboardArrowDown } from 'react-icons/md'
import { BsFillCircleFill } from 'react-icons/bs'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import { useRef } from "react"
import { TaskToolsModal } from "../modal/task-tools-modal"

export function GroupPreview({ group, board, idx }) {
    const [taskToEdit, setTaskToEdit] = useState(boardService.getEmptyTask())
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isShowColorPicker, setIsShowColorPicker] = useState(false)
    const taskRef = useRef()
    const [isMainCheckbox, setIsMainCheckbox] = useState(false)
    const [selectedTasks, setSelectedTasks] = useState([])
    const [isCheckBoxActionDone, setIsCheckBoxActionDone] = useState(null)

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
        const activity = boardService.getEmptyActivity()
        activity.from = { color: group.color, title: group.title }
        activity.action = 'create'
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

    function getTitleName(cmpOrder) {
        switch (cmpOrder) {
            case 'member-picker':
                return 'Person'
            case 'status-picker':
                return 'Status'
            case 'date-picker':
                return 'Date'
            case 'priority-picker':
                return 'Priority'
            default: return ''
        }
    }

    function getStatisticsResult(cmp) {
        switch (cmp) {
            case 'member-picker':
                return []
            case 'status-picker':
                return getStatisticsStatus('status')
            case 'priority-picker':
                return getStatisticsStatus('priority')
            case 'date-picker':
                return []
            default: return []
        }
    }

    function getStatisticsStatus(type) {
        let labels = group.tasks.map(task => {
            return board.labels.find(label => label.title === task[type])
        })
        const mapLabel = labels.reduce((acc, label) => {
            if (acc[label.color]) acc[label.color]++
            else acc[label.color] = 1
            return acc
        }, {})
        let strHtml = []
        for (let key in mapLabel) {
            strHtml.push({ background: key, width: `${mapLabel[key] / labels.length * 100}%` })
        }
        return strHtml
    }

    async function handleCheckboxChange(task) {
        try {
            const activity = boardService.getEmptyActivity()
            activity.task = {id: task.id, title: task.title}
            activity.action = 'check'
            if (selectedTasks.includes(task) && isMainCheckbox) return 
            if (selectedTasks.includes(task)) {
                selectedTasks.splice(selectedTasks.indexOf(task), 1)
                setSelectedTasks((selectedTasks) => ([...selectedTasks]))
                activity.from = true
                activity.to = false
                addActivity(board, activity) 
                return
            }
            activity.to = true
            activity.from = false
            addActivity(board, activity) 
            setSelectedTasks((prevTasks) => ([...prevTasks, task]))
        } catch (err) {
            console.log('err:', err)
        }
        
    }

    return <ul className="group-preview" >
        {isModalOpen &&
            <GroupMenuModal onRemoveGroup={onRemoveGroup} onDuplicateGroup={onDuplicateGroup}
                onChangeGroupColor={onChangeGroupColor} isShowColorPicker={isShowColorPicker}
                groupId={group.id} setIsModalOpen={setIsModalOpen} />}
        <Draggable key={group.id} draggableId={group.id} index={idx}>
            {(provided) => {
                return <div ref={provided.innerRef}
                    {...provided.draggableProps}>
                    <div {...provided.dragHandleProps} className="group-header" style={{ color: group.color }}>
                        <div className="group-header-title">
                        <MdKeyboardArrowDown className="arrow-icon" />
                            <div className="group-menu">
                                <BiDotsHorizontalRounded className="icon" onClick={onOpenModal} />
                            </div>
                            <blockquote className="group-title" contentEditable onBlur={(ev) => onSave(ev)} onFocus={() => setIsShowColorPicker(true)} suppressContentEditableWarning={true}>
                                {isShowColorPicker && <BsFillCircleFill onClick={onShowPalette} />}
                                <h4 data-title={group.title}>{group.title}</h4>
                            </blockquote>
                        </div>
                    </div>
                    <div className="group-preview-content" >
                        <DragDropContext onDragEnd={handleHorizontalDrag}>
                            <Droppable droppableId="title" direction="horizontal">
                                {(droppableProvided) => {
                                    return <div ref={droppableProvided.innerRef} {...droppableProvided.droppableProps} className='title-container'>
                                        <div className="sticky-div titles flex" style={{ borderColor: group.color }}>
                                        <div className="hidden"></div>
                                            <div className="check-box"  >
                                                <input type="checkbox" onClick={() => setIsMainCheckbox(!isMainCheckbox)} />
                                            </div>
                                            <div className="task title">Task</div>
                                        </div>
                                        {board.cmpsOrder.map((title, idx) =>
                                            <Draggable key={title} draggableId={title} index={idx}>
                                                {(provided, snapshot) => {
                                                    return (
                                                        <li ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps} className={title + ' title'} key={idx}>
                                                            {getTitleName(title)}
                                                        </li>
                                                    )
                                                }}
                                            </Draggable>
                                        )}
                                        <div className="add-picker-task">
                                            <span>
                                                <AiOutlinePlus />
                                            </span>
                                            <div className="empty-div"></div>
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
                                                            <TaskPreview task={task} group={group} board={board} handleCheckboxChange={handleCheckboxChange} isMainCheckbox={isMainCheckbox} isCheckBoxActionDone={isCheckBoxActionDone} setIsCheckBoxActionDone={setIsCheckBoxActionDone}/>
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
                        <div className="add-task">
                            <div className="sticky-div" style={{ borderColor: group.color }}>
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
                               <div className="empty-div"></div>     
                            </div> 
                        <div className="statistic flex">
                            <div className="sticky-container">
                            <div className="hidden"></div>
                            </div>
                            {board.cmpsOrder.map((cmp, idx) => {
                                return (
                                    <div key={idx} className={`title ${idx === 0 ? ' first ' : ''}${cmp}`}>
                                        {getStatisticsResult(cmp).map((span, idx) => {
                                            return <span key={idx} style={span} ></span>
                                        })}
                                    </div>
                                )
                            })}
                            <div className="empty-div"></div>
                        </div>
                    </div>
                </div>
            }}
        </Draggable>
        {selectedTasks.length > 0 && <TaskToolsModal board={board} tasks={selectedTasks} group={group} setSelectedTasks={setSelectedTasks} setIsCheckBoxActionDone={setIsCheckBoxActionDone}/>}
    </ul >
}
