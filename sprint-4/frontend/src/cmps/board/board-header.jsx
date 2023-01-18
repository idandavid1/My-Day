import { RiErrorWarningLine } from 'react-icons/ri'
import { BsStar } from 'react-icons/bs'
import { FiActivity } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'

const guest = require('../../assets/img/guest.png')

export function BoardHeader() {
    return (
        <header className="board-header">

            <div className="board-info">
                <h1>Sprint 4</h1>
                <div><RiErrorWarningLine className='icon' /></div>
                <div><BsStar className='icon' /></div>
                <div className='board-description'>
                    <h5 className='board-description-link'>Add your board's description here <span>See More</span></h5>
                </div>
            </div>

            <div className='board-tools flex'>
                <div className='activity'><FiActivity /></div>

                <div className='members-last-seen'>
                    <span className='last-seen-title'>Last seen</span>
                    <div className='flex members-imgs'>

                        <img className='member-img1' src={guest} alt="" />
                        <img className='member-img2' src={guest} alt="" />
                        {/* if there more than 2 members */}
                        <div className='show-more-members'>
                            <span className='show-more-count'>+2</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className='bottom' >
                <GrHomeRounded className='icon' />
            </div> */}

        </header >
    )
}