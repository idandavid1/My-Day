import { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toggleModal, updateTaskAction } from "../../store/board.actions"

import { CgClose, CgLogOff } from 'react-icons/cg'
import { GrHomeRounded } from 'react-icons/gr'
// import { HiOutlineClock } from 'react-icons/hi'
// import { CiCalendarDate } from 'react-icons/ci'
import { AiOutlineBold } from 'react-icons/ai'
import { RxUnderline } from 'react-icons/rx'
import { AiOutlineStrikethrough } from 'react-icons/ai'
import { TbAlignRight ,TbAlignCenter,TbAlignLeft } from 'react-icons/tb'
import { CiClock2 } from 'react-icons/ci'
import { BiDotsHorizontalRounded } from 'react-icons/bi'


export function BoardModal() {
    const [isWriteNewUpdate, setIsWriteNewUpdate] = useState(false)
    const {groupId, taskId, boardId} = useParams()
    const navigate = useNavigate()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)
    const [currTask, setCurrTask] = useState(null)

    useEffect(() => {
        if(taskId && groupId) loadTask() 
    }, [taskId])
    
    function loadTask() {
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        setCurrTask(task)
    } 
    
    function onCloseModal() {
        navigate(`/board/${boardId}`)
        toggleModal(isOpen)
    }

    async function onUpdateTaskTitle(ev) {
        const value = ev.target.innerText
        currTask.title = value
        try {
            await updateTaskAction(board, groupId, currTask)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    function onCloseInput(ev) {
        ev.preventDefault()
        setIsWriteNewUpdate(false)
    }

    if (!currTask) return <div></div>
    return <section className={`board-modal ${isOpen ? 'open' : ''}`}>
        <div className="board-modal-header">
            <CgClose className="close-btn" onClick={onCloseModal} />
            <div className="title">
                <blockquote contentEditable onBlur={onUpdateTaskTitle} suppressContentEditableWarning={true}>
                    {currTask.title}
                </blockquote>
            </div>
        </div>
            <div className="board-info">
                <div className="updates-btn">
                    <GrHomeRounded />
                    <span>Updates</span>
                </div>
                <div className="activity-btn active">
                    <span>Activity Log</span>
                </div>
            </div>
            {/* <div className="activities">
                <div className="activity">
                    <div className="activity-date">
                        <HiOutlineClock />
                        1d
                    </div>
                    <div className="activity-info">
                        <img src={guest} alt="" />
                        <span>Changed the task date</span>
                    </div>
                    <div className="activity-type">
                        <CiCalendarDate/>
                        <span>Date</span>
                    </div>
                    <div className="activity-date">
                        <span>Jan 1</span>
                    </div>
                </div> */
            /* </div> */}
            <section className="update">
                    <form onBlur={onCloseInput} className={`input-container ${isWriteNewUpdate ? ' open' : '' }`}>
                        {!isWriteNewUpdate && <span className="close-input-container" onClick={() => setIsWriteNewUpdate(true)}>Write an update</span>}
                        {isWriteNewUpdate && <div className="style-txt">
                            <span><AiOutlineBold /></span>
                            <span><RxUnderline /></span>
                            <span><AiOutlineStrikethrough /></span>
                            <span><TbAlignLeft /></span>
                            <span><TbAlignCenter /></span>
                            <span><TbAlignRight /></span>
                            </div>}
                        {isWriteNewUpdate &&<textarea autoFocus></textarea>}
                    </form>
                <ul className="comments-list">
                    {
                        currTask.comments.map(comment => {
                            return (
                            <li key={comment.id}>
                                <div className="header-comment">
                                    <div className="left">
                                        <img src={comment.byMember.imgUrl} alt="" />
                                        <span>{comment.byMember.fullname}</span>
                                    </div>
                                    <div className="right">
                                        <div className="time">
                                            <CiClock2 />
                                            <span>3h</span>
                                        </div>
                                        <BiDotsHorizontalRounded />
                                    </div>
                                </div>
                                <p>{comment.txt}</p>
                            </li>
                        )})
                    }
                </ul>
            </section>
    </section>
}