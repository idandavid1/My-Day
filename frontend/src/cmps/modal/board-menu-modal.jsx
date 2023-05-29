import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { FiTrash } from 'react-icons/fi'

export function BoardMenuModal({ onRemove, onDuplicate, setIsMenuModalOpen, board }) {

    function onRemoveBoard() {
        setIsMenuModalOpen(false)
        onRemove(board._id)
    }   

    function onDuplicateBoard() {
        setIsMenuModalOpen(false)
        onDuplicate(board)
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