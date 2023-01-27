import { useEffect, useState } from "react"

import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toggleModal, updateTaskAction } from "../../store/board.actions"

import { CgClose } from 'react-icons/cg'
import { GrHomeRounded } from 'react-icons/gr'
import { AiOutlineBold } from 'react-icons/ai'
import { RxUnderline } from 'react-icons/rx'
import { TbAlignRight ,TbAlignCenter,TbAlignLeft } from 'react-icons/tb'
import { boardService } from "../../services/board.service"
import { utilService } from "../../services/util.service"
import { CommentPreview } from "../task/comment-preview"
import { ActivityPreview } from "../activity-preview"
import { socketService, SOCKET_EMIT_SEND_MSG, SOCKET_EMIT_SET_TOPIC, SOCKET_EVENT_ADD_MSG } from "../../services/socket.service"
const noUpdate = require('../../assets/img/empty-update.png')

export function BoardModal({ setIsMouseOver }) {
    const [isWriteNewUpdate, setIsWriteNewUpdate] = useState(false)
    const [comment, setComment] = useState(boardService.getEmptyComment())
    const [comments, setComments] = useState([])
    const [currTask, setCurrTask] = useState(null)
    const [isShowUpdate, setIsShowUpdate] = useState(true)
    const [taskActivities, setTaskActivities] = useState([])
    const {groupId, taskId, boardId} = useParams()
    const navigate = useNavigate()
    const board = useSelector((storeState) => storeState.boardModule.board)
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)

    useEffect(() => {
        if(taskId && groupId){
            loadTask()
            loadTaskActivity()
        }
    }, [taskId])

    useEffect(() => {
        if(taskId && groupId) {
            socketService.emit(SOCKET_EMIT_SET_TOPIC, taskId)
            socketService.on(SOCKET_EVENT_ADD_MSG, addComment)
        }  

        return () => {
            socketService.off(SOCKET_EVENT_ADD_MSG, addComment)
        }
    }, [])

    function addComment(comment) {
        setComments((prevComments) => [comment, ...prevComments])
    }
    
    function loadTask() {
        const group = board.groups.find(group => group.id === groupId)
        const task = group.tasks.find(task => task.id === taskId)
        setComments(task.comments) 
        setCurrTask(task)
    }
    
    function loadTaskActivity() {
        const taskActivities = board.activities.filter(activity => activity.task.id === taskId )
        setTaskActivities(taskActivities)
    }
    
    function onCloseModal() {
        navigate(`/board/${boardId}`)
        toggleModal(isOpen)
        setComment(boardService.getEmptyComment())
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

    async function onAddComment() {
        try {
            comment.id = utilService.makeId()
            currTask.comments.unshift(comment)
            socketService.emit(SOCKET_EMIT_SEND_MSG, comment)
            updateTaskAction(board, groupId, currTask)
            setIsWriteNewUpdate(false)
            setComment(boardService.getEmptyComment())
        } catch (err) {
            console.log('err:', err)
        }  
    }

    function close(ev) {
        ev.preventDefault()
        setIsWriteNewUpdate(false)
        setComment(boardService.getEmptyComment())
    }

    async function onRemoveComment(commentId) {
        try {
            currTask.comments = currTask.comments.filter(comment => comment.id !== commentId)
            updateTaskAction(board, groupId, currTask)
            setCurrTask({...currTask})
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onChangeTextStyle(ev, styleKey, align) {
        ev.preventDefault()
        const style = {...comment.style}
        switch (styleKey) {
            case 'fontStyle':  
                style.fontStyle = style.fontStyle === 'normal' ? 'italic' : 'normal'
                break;
            case 'fontWeight': 
                style.fontWeight = style[styleKey] === 'normal' ? 'bold' : 'normal'
                break;
            case 'textDecoration': 
                style[styleKey] = style[styleKey] === 'none' ? 'underline' : 'none'
                break;
            case 'textAlign': 
                style[styleKey] = align
                break;
            default: return
        }
        setComment((prevComment) => ({ ...prevComment, style }))
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setComment((prevComment) => ({ ...prevComment, [field]: value }))
    }

    async function onEditComment(saveComment) {
        try {
            currTask.comments = currTask.comments.map(comment => (comment.id === saveComment.id) ? saveComment : comment)
            updateTaskAction(board, groupId, currTask)
            setCurrTask({...currTask})
        } catch (err) {
            console.log('err:', err)
        }
    }

    if (!currTask) return <div></div>
    return <section className={`board-modal ${isOpen ? 'open' : ''}`} onMouseOver={() => setIsMouseOver(true)} onMouseOut={() => setIsMouseOver(false)}>
        <div className="board-modal-header">
            <CgClose className="close-btn" onClick={onCloseModal} />
            <div className="title">
                <blockquote contentEditable onBlur={onUpdateTaskTitle} suppressContentEditableWarning={true}>
                    {currTask.title}
                </blockquote>
            </div>
        </div>
            <div className="board-info">
                <div onClick={() => setIsShowUpdate(!isShowUpdate)} className={`updates-btn ${isShowUpdate ? 'active' : ''}`}>
                    <GrHomeRounded />
                    <span>Updates</span>
                </div>
                <div onClick={() => setIsShowUpdate(!isShowUpdate)} className={`activity-btn ${!isShowUpdate ? 'active' : ''}`}>
                    <span>Activity Log</span>
                </div>
            </div>
            {!isShowUpdate && <ul className="activities">
            {
                taskActivities.map(activity => {
                    return <li key={activity.id}><ActivityPreview activity={activity}/></li>
               })
            }
            </ul>}
       
            {isShowUpdate && <section className="update">
                    {!isWriteNewUpdate && <span className="close-input-container" onClick={() => setIsWriteNewUpdate(true)}>Write an update</span>}
                    {isWriteNewUpdate && <form className="input-container">
                        <div className="style-txt">
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'fontWeight')}><AiOutlineBold /></span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'textDecoration')}><RxUnderline /></span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'fontStyle')}>/</span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'textAlign', 'Left')}><TbAlignLeft /></span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'textAlign', 'Center')}><TbAlignCenter /></span>
                            <span onMouseDown={(ev) => onChangeTextStyle(ev, 'textAlign', 'Right')}><TbAlignRight /></span>
                        </div>
                        <textarea
                        name="txt"
                        style={comment.style}
                        value={comment.txt}
                        onBlur={close}
                        onChange={handleChange}></textarea>
                    </form>}
                    {isWriteNewUpdate && <div className="button-container"><button className="save" onMouseDown={onAddComment}>Update</button></div>}
                <ul className="comments-list">
                    {
                        comments.map(comment => {
                            return (
                            <li key={comment.id}>
                                <CommentPreview onRemoveComment={onRemoveComment} comment={comment} onEditComment={onEditComment}/>
                            </li>
                        )})
                    }
                </ul>
                {comments.length === 0 && 
                <div className="no-updates">
                    <img src={noUpdate} alt="" />
                    <div className="txt">
                        <h2>No updates yet for this item</h2>
                        <p>Be the first one to update about progress, mention someone 
                            <br/>or upload files to share with your team members
                        </p>
                    </div>
                </div>}
            </section>}
    </section>
}