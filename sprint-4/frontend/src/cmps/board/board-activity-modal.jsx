import { useEffect } from "react"
import { useState } from "react"
import { CgClose } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { toggleModal, updateTaskAction } from "../../store/board.actions"
import { ActivityPreview } from "../activity-preview"
import { LastViewed } from "../last-viewed"
import { CommentPreview } from "../task/comment-preview"

export function BoardActivityModal({ board, activityLog }) {
    const navigate = useNavigate()
    const [view, setView] = useState(activityLog)
    const [tasks, setTasks] = useState([])

    useEffect(() => {
        loadTasks()
    }, [])
    
    function onCloseModal() {
        navigate(`/board/${board._id}`)
        toggleModal(true)
    }

    function loadTasks() {
        const tasks = board.groups.reduce((acc, group) => {
            acc.push(...group.tasks)
            return acc
        }, [])
        setTasks(tasks)
    }

    async function onRemoveComment(commentId, taskId) {
        try {
            const task = tasks.find(task => task.id === taskId)
            const group = board.groups.find(group => {
                return group.tasks.some(task => task.id === taskId)
            })
            task.comments = task.comments.filter(comment => comment.id !== commentId)
            updateTaskAction(board, group.id, task)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onEditComment(saveComment, taskId) {
        try {
            const task = tasks.find(task => task.id === taskId)
            const group = board.groups.find(group => {
                return group.tasks.some(task => task.id = taskId)
            })
            task.comments = task.comments.map(comment => (comment.id === saveComment.id) ? saveComment : comment)
            updateTaskAction(board, group.id, task)
        } catch (err) {
            console.log('err:', err)
        }
    }
    return (
        <section className="board-activity">
            <div className="board-activity-header">
                    <CgClose className="close-btn" onClick={onCloseModal} />
                    <h3 className="board-title">{board.title} <span>Log</span></h3>
                    <div className="views">
                    <span id="1" className={view === 'activity' ? 'active' : ''} onClick={() => setView('activity')}>Activity</span>
                        <span id="2" className={view === 'last-viewed' ? 'active' : ''} onClick={() => setView('last-viewed')}>Last Viewed</span>
                        <span id="3" className={view === 'updates' ? 'active' : ''} onClick={() => setView('updates')}>Updates</span>
                    </div>
            </div>
            <div className="board-activity-content">
                {view === 'activity' &&
                    board.activities.map(activity => {
                        return <li key={activity.id}><ActivityPreview activity={activity} /></li>
                    })
                }
                {view === 'last-viewed' &&
                    <section className="last-viewed">
                        <div className="title">
                            <span>Name</span>
                            <span>Last viewed</span>
                        </div>

                        {board.members.map(member => {
                            return <li key={member._id}> <LastViewed member={member} /> </li>
                        })}
                    </section>
                }
                {view === 'updates' &&
                    <section className="update">
                        <div className="comments-list">
                        {tasks.map(task => {
                            return task.comments.map(comment => {
                                return <li key={comment._id}><CommentPreview onRemoveComment={onRemoveComment} comment={comment} onEditComment={onEditComment} taskId={task.id}/></li>
                            })
                            
                        })} 
                        </div>
                    </section>
                }
            </div>
        </section>
    )
}