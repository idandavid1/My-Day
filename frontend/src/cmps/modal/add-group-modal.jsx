import React from 'react'
import { BsArrowDownCircle } from 'react-icons/bs'
import { CgViewComfortable } from 'react-icons/cg'
import { useSelector } from 'react-redux'
import { addGroup, setDynamicModalObj } from '../../store/board.actions'

export function AddGroupModal({ dynamicModalObj }) {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)

    function onAddGroup() {
        try {
            addGroup(board)
            dynamicModalObj.isOpen = false
            setDynamicModalObj(dynamicModalObj)
        } catch (err) {
            console.log('cant add group:', err)
        }
    }
    return (
        <div className='add-group-modal'>
            <div className='add-group' onClick={onAddGroup}>
                <CgViewComfortable className='icon' />
                <span>New group of Tasks</span>
            </div>
            <div className='import-tasks'>
                <BsArrowDownCircle className='icon' />
                <span>Import tasks</span>
            </div>
        </div>
    )
}
