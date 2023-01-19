import { RiErrorWarningLine } from 'react-icons/ri'
import { BsStar } from 'react-icons/bs'
import { FiActivity } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'
import { BoardFilter } from '../task/board-filter'

export function BoardHeader({board}) {
    return (
        <header className="board-header">
            <section className='board-title'>
                <div className="board-info">
                    <h1>Sprint 4</h1>
                    <div className='info-btn'><RiErrorWarningLine /></div>
                    <div className='star-btn'><BsStar /></div>
                </div>
                <div className='board-tools flex'>
                    <div className='activity'><FiActivity /></div>
                    <div className='members-last-seen'>
                        <span className='last-seen-title'>Last seen</span>
                        <div className='flex members-imgs'>
                            <img className='member-img1' src={board.members[2].imgUrl} alt="member" />
                            <img className='member-img2' src={board.members[3].imgUrl} alt="member" />
                            {/* if there more than 2 members */}
                            <div className='show-more-members'>
                                <span className='show-more-count'>+2</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className='board-description'>
                <p className='board-description-link'>Add your board's description here <span>See More</span></p>
            </div>
            <div className='board-display-btns' >
                <div className='main-table-btn active'>
                    <GrHomeRounded className='icon' />
                    <span>Main Table</span>
                </div>
            </div>
            <div className='board-border'></div>
            <BoardFilter board={board}/>
        </header >
    )
}