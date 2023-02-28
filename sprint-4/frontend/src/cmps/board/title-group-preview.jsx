import { useRef } from "react"
import { useSelector } from "react-redux"

import { setDynamicModalObj } from "../../store/board.actions"

import { BiDotsHorizontalRounded } from 'react-icons/bi'

export function TitleGroupPreview({ title, group, isKanban }) {
    const dynamicModalObj = useSelector(storeState => storeState.boardModule.dynamicModalObj)
    const elRemoveColumn = useRef()

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

    function onToggleMenuModal() {
        console.log(elRemoveColumn)
        const isOpen = dynamicModalObj?.group?.id === group.id && dynamicModalObj?.cmpOrder === title && dynamicModalObj?.type === 'remove-column' ? !dynamicModalObj.isOpen : true
        const { x, y } = elRemoveColumn.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x - 75), y: (y + 28) }, type: 'remove-column', group: group, cmpOrder: title })
    }

    return (
        <>
            {getTitleName(title)}
            <span ref={elRemoveColumn} className="open-modal-icon">
                {!isKanban && <BiDotsHorizontalRounded onClick={onToggleMenuModal} />}
            </span>
        </>
    )
}