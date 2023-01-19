import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { loadBoard } from "../../store/board.actions"
import { removeBoard, saveBoard } from "../../store/board.actions"
import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { FiTrash } from 'react-icons/fi'

export function BoardPreview({ board }) {
    const [isMouseOver, setIsMouseOver] = useState(false)
    const { boardId } = useParams()
    const navigate = useNavigate()
    
    function onChangeBoard(boardId) {
        navigate(`/board/${boardId}`)
        loadBoard(boardId)
    }

    async function onRemove(boardId) {
        try {
            removeBoard(boardId)
        } catch (err) {
            console.log('err:', err)
        }
    }

    async function onDuplicate(board) {
        try {
            const DuplicateBoard = structuredClone(board) 
            DuplicateBoard._id = null
            saveBoard(DuplicateBoard)
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section onClick={() => onChangeBoard(board._id)} className={`board-preview ${board._id === boardId ? ' active' : ''}`}
        onTouchStart={() => setIsMouseOver(true)} onTouchEnd={() => setIsMouseOver(false)} onMouseOver={() => setIsMouseOver(true)} onMouseOut={() => setIsMouseOver(false)}>
        <div>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" />
            </svg>
            <span>{board.title}</span>
        </div>
       {isMouseOver && <div className='icons'>
            <HiOutlineDocumentDuplicate onClick={() => onDuplicate(board)} />
            <FiTrash onClick={() => onRemove(boardId)}/>
        </div>}
    </section>
    )
}