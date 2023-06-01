import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { FiTrash } from 'react-icons/fi'
import { useSelector } from 'react-redux'
import { setDynamicModalObj } from '../../store/board.actions'

export function BoardMenuModal({ dynamicModalObj }) {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)

    function onRemoveBoard() {
        setDynamicModalObj({ isOpen: false})
        dynamicModalObj.onRemove(board._id)
    }   

    function onDuplicateBoard() {
        setDynamicModalObj({ isOpen: false})
        dynamicModalObj.onDuplicate(board)
    }   
    
    return (
        <section className="board-menu-modal">
            <div className="duplicate" onClick={onDuplicateBoard}>
                <HiOutlineDocumentDuplicate />
                <span>Duplicate Board</span>
            </div>
            <div className="delete" onClick={onRemoveBoard}>
                <FiTrash />
                <span>Delete</span>
            </div>
        </section>
    )
}