import { RiErrorWarningLine } from 'react-icons/ri'
import { BsStar } from 'react-icons/bs'
import { FiActivity } from 'react-icons/fi'
import { GrHomeRounded } from 'react-icons/gr'
import { BoardFilter } from '../task/board-filter'
import { updateAction } from '../../store/board.actions'

const guest = require('../../assets/img/guest.png')

export function BoardHeader({board}) {

    async function onSave(ev) {
        const value = ev.target.innerText
        board.title = value
        try {
            updateAction(board)
        } catch (err) {
            console.log('Failed to save')
        }
    }

    return (
        <header className="board-header">
            <section className='board-title'>
                <div className="board-info">
                <blockquote contentEditable onBlur={onSave} suppressContentEditableWarning={true}>
                    <h1>{board.title}</h1>
                </blockquote>
                    <div className='info-btn'><RiErrorWarningLine /></div>
                    <div className='star-btn'><BsStar /></div>
                </div>
                <div className='board-tools flex'>
                    <div className='activity'><FiActivity /></div>
                    <div className='members-last-seen'>
                        <span className='last-seen-title'>Last seen</span>
                        <div className='flex members-imgs'>
                            <img className='member-img1' src={board.members.length ?  board.members[0].imgUrl : guest} alt="member" />
                            <img className='member-img2' src={board.members.length > 1 ?  board.members[1].imgUrl : guest } alt="member" />
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