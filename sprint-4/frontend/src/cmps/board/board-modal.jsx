import { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import { CgClose } from 'react-icons/cg'
import { GrHomeRounded } from 'react-icons/gr'
import { HiOutlineClock } from 'react-icons/hi'
import { CiCalendarDate } from 'react-icons/ci'

const guest = require('../../assets/img/guest.png')

export function BoardModal({ closeModal, onUpdateTaskTitle ,isOpenModal}) {
    const params = useParams()
    const navigate = useNavigate()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const [currTask, setCurrTask] = useState(null)

    useEffect(() => {
        console.log(params)
        if(!params.taskId) return
        loadTask()
    }, [])
    
    function loadTask() {
        const group = board.groups.find(group => group.id === params.groupId)
        const task = group.tasks.find(task => task.id === params.taskId)
        setCurrTask(task)
    }
    
    function onCloseModal() {
        navigate(`/board/${params.boardId}`)
        closeModal()
    }
    if (!currTask) return <div></div>
    return <section className={`board-modal ${isOpenModal ? 'open' : ''}`}>
        <div className="board-modal-header">
            <CgClose className="close-btn" onClick={onCloseModal} />
            <div className="title">
                <blockquote contentEditable onBlur={onUpdateTaskTitle} suppressContentEditableWarning={true}>
                    {currTask.title}
                </blockquote>
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
            <div className="activities">
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
                </div>

            </div>
        </div>
    </section>
}