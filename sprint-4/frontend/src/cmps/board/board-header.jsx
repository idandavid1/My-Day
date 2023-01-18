import { RiErrorWarningLine } from 'react-icons/ri'
import { BsStar } from 'react-icons/bs'
import { FiActivity } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'

const guest = require('../../assets/img/guest.png')

export function BoardHeader() {
    return (
        <header className="board-header">

            <div className="board-description">
                <h1>Sprint 4</h1>
                <div><RiErrorWarningLine className='icon' /></div>
                <div><BsStar className='icon' /></div>
                <div><FiActivity className='icon' /></div>
            </div>

            <div className='board-tools flex'>
                <div className='members-last-seen'>
                    <span>Last seen</span>
                    <div className='members-imgs-container flex'>

                        <img className='member-img' src={guest} alt="" />
                        <img className='member-img' src={guest} alt="" />
                    </div>
                </div>
            </div>
            {/* <div className='bottom' >
                <GrHomeRounded className='icon' />
            </div> */}

        </header >
    )
}