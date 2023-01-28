import { useState } from "react"
import { CgClose } from "react-icons/cg"
import { useNavigate } from "react-router-dom"
import { toggleModal } from "../../store/board.actions"
import { ActivityPreview } from "../activity-preview"
import { LastViewed } from "../last-viewed"




export function BoardActivityModal({ board }) {
    const navigate = useNavigate()
    const [active, setActive] = useState('1')
    const [view, setView] = useState('activity')

    function onCloseModal() {
        navigate(`/board/${board._id}`)
        toggleModal(true)
    }

    function toggleActive(ev, type) {
        setActive(ev.target.id)
        setView(type)
    }

    return (
        <section className="board-activity-header">
            <CgClose className="close-btn" onClick={onCloseModal} />
            <h3 className="board-title">{board.title} <span>Log</span></h3>
            <div className="views">
                <span id="1" className={active === '1' ? 'active' : ''} onClick={(ev) => toggleActive(ev, 'activity')}>Activity</span>
                <span id="2" className={active === '2' ? 'active' : ''} onClick={(ev) => toggleActive(ev, 'last-viewed')}>Last Viewed</span>
                <span id="3" className={active === '3' ? 'active' : ''} onClick={(ev) => toggleActive(ev, 'updates')}>Updates</span>
            </div>
            {view === 'activity' &&
                board.activities.map(activity => {
                    return <li key={activity.id}><ActivityPreview activity={activity} /></li>
                })
            }
            {view === 'last-viewed' &&
                <>
                    <div className="title">
                        <span>Name</span>
                        <span>Last viewed</span>
                    </div>

                    {board.members.map(member => {
                        return <li key={member._id}> <LastViewed member={member} /> </li>
                    })}
                </>

            }
        </section>
    )
}