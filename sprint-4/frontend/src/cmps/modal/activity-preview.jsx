
import { IoTimeOutline }  from 'react-icons/io5'
import { IoIosArrowForward }  from 'react-icons/io'
import { CiCalendarDate }  from 'react-icons/ci'
import { BsPlusCircle }  from 'react-icons/bs'

import { utilService } from "../../services/util.service"
import { useSelector } from 'react-redux'
const statusImg = require('../../assets/img/status.png')
export function ActivityPreview({ activity }) {

    function getIconAction(action) {
        switch (action) {
            case 'status':
                return <img src={statusImg} alt="" />
            case 'priority':
                return <img src={statusImg} alt="" />
            case 'date': 
                return <CiCalendarDate className='icon'/>
            case 'create': 
                return <BsPlusCircle className='icon'/>
            default:
                break;
        }
    }

    function getFromTo(action) {
        switch (action) {
            case 'status':
                return <FromToStatusPriority activity={activity}/>
            case 'priority':
                return <FromToStatusPriority activity={activity}/>
            case 'date': 
                return <FromToDueDate activity={activity}/>
            case 'create': 
                return <FromToCreate activity={activity}/>
            default:
                break;
        }
    }

    return (
        <section className="activity-preview">
                <div className="time-title">
                    <div className="time">
                        <IoTimeOutline />
                        <span>{utilService.calculateTime(activity.createdAt)}</span>
                    </div>
                    <div className='title'>
                        <img src={activity.byMember.imgUrl} alt="" />
                        <span>{activity.task.title}</span>
                    </div>
                </div>
                <div className='action'>
                    {getIconAction(activity.action)}
                    <div>{activity.action}</div>
                </div>
                {getFromTo(activity.action)}
        </section>
    )
}

function FromToStatusPriority({ activity }) {
    return (
        <div className='from-to label-container'>
            <span className='label' style={{backgroundColor: activity.from.color}}>{activity.from.title}</span>
            <IoIosArrowForward className='icon'/>
            <span className='label' style={{backgroundColor: activity.to.color}}>{activity.to.title}</span>
        </div>
    )
}

function FromToDueDate({ activity }) {
    let date = new Date(activity.from)
    const fromDate = activity.from ? utilService.getMonthName(date) + '  ' + date.getDate() : '-'
    date = new Date(activity.to)
    const toDate = utilService.getMonthName(date) + '  ' + date.getDate()
    return (
        <div className='from-to date-container'>
            <span className='date'>{fromDate}</span>
            <IoIosArrowForward className='icon'/>
            <span className='date'>{toDate}</span>
        </div>
    )
}

function FromToCreate({ activity }) {
    return (
        <div className='from-to create-container'>
            <span>Group: </span>
            <span style={{color: activity.from.color}}>{activity.from.title}</span>
        </div>
    )
}