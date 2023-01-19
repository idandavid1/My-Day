import { FaAngleDown } from 'react-icons/fa'
import { addGroup } from '../../store/board.actions'


export function BoardFilter({ board }) {
   


    return (<section className="board-filter">
        <div className="add-btn">
            <button className="new-item-btn">New Item</button>
            <button className="dropdown-btn" onClick={() => addGroup(board)}><FaAngleDown className="icon" /></button>
        </div>
    </section>
    )
}