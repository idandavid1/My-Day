import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { BiDotsHorizontalRounded, BiMessageRoundedAdd } from 'react-icons/bi'
import { HiOutlineChatBubbleOvalLeft } from 'react-icons/hi2'
import { setDynamicModalObj, toggleModal, updateTaskAction } from '../../store/board.actions'

export function TaskTitleKanban({task , group , board}) {
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)
    const dynamicModalObj = useSelector(storeState => storeState.boardModule.dynamicModalObj)
    const navigate = useNavigate()
    const elTaskModalBtn = useRef()

    function onOpenModal(task) {
        toggleModal(isOpen)
        navigate(`/board/${board._id}/${group.id}/${task.id}`)
    }

    function onToggleTaskModal(task) {
        const isOpen = dynamicModalObj?.task?.id === task.id && dynamicModalObj?.type === 'menu-task' ? !dynamicModalObj.isOpen : true
        const { x, y} = elTaskModalBtn.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x - 180 ), y: (y + 25 ) }, type: 'menu-task', group: group, task: task })
    }

    async function onUpdateTaskTitle(ev, task) {
        const value = ev.target.innerText
        task.title = value
        try {
            await updateTaskAction(board, group.id, task)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    return (
        <section className="task-title" >
            <blockquote contentEditable onBlur={(ev) => onUpdateTaskTitle(ev, task)} suppressContentEditableWarning={true}>
                <span>{task.title}</span>
            </blockquote>
            <div onClick={() => onOpenModal(task)} className="chat-icon">
                {task.comments.length > 0 && <div>
                    <HiOutlineChatBubbleOvalLeft className="comment-chat" />
                    <div className="count-comment">{task.comments.length}</div>
                </div>}
                {task.comments.length === 0 && <BiMessageRoundedAdd className="icon" />}
            </div>
            <div className="task-menu" ref={elTaskModalBtn}>
                <BiDotsHorizontalRounded className="icon" onClick={() => onToggleTaskModal(task)} />
            </div>
        </section>
    )
}