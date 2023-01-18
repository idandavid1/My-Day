import { RiErrorWarningLine } from 'react-icons/ri'
import { BsStar } from 'react-icons/bs'
import { FiActivity } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'

const guest = require('../../assets/img/guest.png')

export function BoardHeader() {
    return (
        <header className="board-header">
            <div className="top">
                <div>
                    <h1>Sprint 4</h1>
                    <div><RiErrorWarningLine className='icon' /></div>
                    <div><BsStar className='icon' /></div>
                </div>
                <div>
                    <div><FiActivity className='icon' /></div>
                    {/* <div>last seen <span><img className='guest-img' src={guest} alt="" /></span></div> */}
                </div>
            </div>
            <div className='bottom' >
                <GrHomeRounded className='icon' />
            </div>

        </header>
    )
}