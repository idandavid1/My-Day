import { BsPinAngle } from 'react-icons/bs'
import { AiOutlineDelete } from 'react-icons/ai'
import { FiEdit2 } from 'react-icons/fi'

export function CommentMenuModal({ commentId, onRemoveComment, onOpenEdit, setIsMenuModalOpen, taskId }) {

    function onRemove(commentId) {
        setIsMenuModalOpen(false)
        onRemoveComment(commentId, taskId)
    }   

    function onEdit() {
        setIsMenuModalOpen(false)
        onOpenEdit(true)
    }   
    return (
        <section className="comment-modal">
            <div className="pin">
                <BsPinAngle />
                <span>Pin to top</span>
            </div>
            <div className="edit" onClick={onEdit}>
                <FiEdit2 />
                <span>Edit update</span>
            </div>
            <div className="delete" onClick={() => onRemove(commentId, taskId)}>
                <AiOutlineDelete />
                <span>Delete update for everyone</span>
            </div>
        </section>
    )
}