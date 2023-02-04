import { useState } from "react"

import { FiTrash } from 'react-icons/fi'
import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { loadBoard, saveBoard } from "../../store/board.actions"

export function TitleGroupPreview({ title, board, setModalOpen, isKanban }) {
    const [isShowCmpModal, setIsShowCmpModal] = useState(false)

    async function onRemoveColumn(cmpOrder) {
        try {
            board.cmpsOrder = board.cmpsOrder.filter(currCmpOrder => currCmpOrder !== cmpOrder)
            await saveBoard(board)
            loadBoard(board._id)
            setModalOpen(false)
        } catch (err) {
            console.log(err)
        }
    }

    function onOpenModal() {
        setModalOpen(true)
        setIsShowCmpModal(!isShowCmpModal)
    }

    function getTitleName(cmpOrder) {
        switch (cmpOrder) {
            case 'member-picker':
                return 'Person'
            case 'status-picker':
                return 'Status'
            case 'date-picker':
                return 'Date'
            case 'priority-picker':
                return 'Priority'
            case 'number-picker':
                return 'Number'
            case 'file-picker':
                return 'Files'
            case 'updated-picker':
                return 'Last Updated'
            default: return ''
        }
    }

    return (
        <>
            {getTitleName(title)}
            {!isKanban && <BiDotsHorizontalRounded className="open-modal-icon" onClick={onOpenModal} />}
            {isShowCmpModal && <div className="delete-modal">
                <div className="delete" onClick={() => onRemoveColumn(title)}>
                    <FiTrash />
                    <span>Delete</span>
                </div>
            </div>}
        </>
    )

}