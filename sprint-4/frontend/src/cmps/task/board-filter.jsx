import { FaAngleDown } from 'react-icons/fa'
import { TfiSearch } from 'react-icons/tfi'
import { BsPersonCircle } from 'react-icons/bs'
import { BiFilterAlt } from 'react-icons/bi'
import { RxCaretSort } from 'react-icons/rx'
import { AiOutlineEyeInvisible } from 'react-icons/ai'
import { BiDotsHorizontalRounded } from 'react-icons/bi'

import { addGroup } from '../../store/board.actions'


export function BoardFilter({ board }) {
    return (<section className="board-filter">
        <div className="add-btn">
            <button className="new-item-btn">New Task</button>
            <button className="dropdown-btn" onClick={() => addGroup(board)}><FaAngleDown className="icon" /></button>
        </div>
        <button className="search-btn"><TfiSearch /> Search</button>
        <button className="person-btn"><BsPersonCircle /> Person</button>
        <button className="filter-btn"><BiFilterAlt /> Filter</button>
        <button className="sort-btn"><RxCaretSort /> Sort</button>
        <button className="hide-btn"><AiOutlineEyeInvisible /> Hide</button>
        <button className="more-btn"><BiDotsHorizontalRounded /> </button>
    </section>
    )
}