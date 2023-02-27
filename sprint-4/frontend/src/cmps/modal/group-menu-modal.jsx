import { useState } from 'react'

import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { BsFillCircleFill } from 'react-icons/bs'
import { duplicateGroup, setDynamicModalObj, updateGroups } from '../../store/board.actions'
import { useSelector } from 'react-redux'

export function GroupMenuModal({ dynamicModalObj }) {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)

    function onRemoveGroup() {
        try {
            updateGroups(dynamicModalObj.group.id, board)
            dynamicModalObj.isOpen = false
            setDynamicModalObj(dynamicModalObj)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onDuplicateGroup() {
        try {
            duplicateGroup(board, dynamicModalObj.group)
            dynamicModalObj.isOpen = false
            setDynamicModalObj(dynamicModalObj)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function openPaletteModal() {
        dynamicModalObj.type = 'palette-modal'
        setDynamicModalObj({...dynamicModalObj})
    }

    return (
        <section className="group-menu-modal">
            <div className='color' onClick={openPaletteModal} >
                <BsFillCircleFill style={{ color: 'yellow' }} />
                <span>Change group color</span>
            </div>
            <div className="duplicate" onClick={onDuplicateGroup}>
                <HiOutlineDocumentDuplicate />
                <span>Duplicate this group</span>
            </div>
            <div className="delete" onClick={onRemoveGroup}>
                <RiDeleteBinLine />
                <span>Delete</span>
            </div>
        </section>
    )
}