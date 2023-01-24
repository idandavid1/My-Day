
import { IoTimeOutline, IoIosArrowForward }  from 'react-icons/io5'

import { utilService } from "../../services/util.service"

export function ActivityPreview({ activity }) {

    function getIconAction(action) {
        switch (action) {
            case 'status':
                return 
        
            default:
                break;
        }
    }

    function getFromTo(action) {
        switch (action) {
            case 'status':
                return <div>
                    <span style={{backgroundColor: activity.from.color}}>{activity.from.title}</span>

                    <span style={{backgroundColor: activity.from.color}}>{activity.to.title}</span>
                </div>
        
            default:
                break;
        }
    }

    return (
        <section className="activity-preview">
                <div className="time-title">
                    <div className="time">
                        <IoTimeOutline />
                        <span>{utilService.calculateTime(comment.archivedAt)}</span>
                    </div>
                    <div className='title'>
                        <img src={activity.byMember.imgUrl} alt="" />
                        <span>{activity.task.title}</span>
                    </div>
                </div>
                <div className='action'>
                    <div>{activity.action}</div>
                    {getIconAction(activity.action)}
                </div>
                <div className='from-to'>
                    {
                    }
                </div>
        </section>
    )
}