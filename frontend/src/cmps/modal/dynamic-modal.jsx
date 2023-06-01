import React from 'react'
import { useSelector } from 'react-redux'
import { ColorPalette } from '../color-palette'
import { GroupMenuModal } from './group-menu-modal'
import { AddColumnModal } from './add-column-modal'
import { RemoveColumnModal } from './remove-column-modal'
import { TaskMenuModal } from './task-menu-modal'
import { ModalMember } from './modal-member'
import { ModalStatusPriority } from './modal-status-priority'
import { AddGroupModal } from './add-group-modal'
import { MemberFilterModal } from './member-filter-modal'
import { ChartTypeModal } from './chart-type-modal'
import { BoardMenuModal } from './board-menu-modal'

export function DynamicModal() {

    const dynamicModalObj = useSelector(storeState => storeState.boardModule.dynamicModalObj)

    function getDynamicModalByType(type) {
        switch (type) {
            case 'menu-group':
                return <GroupMenuModal dynamicModalObj={dynamicModalObj} />
            case 'palette-modal':
                return <ColorPalette dynamicModalObj={dynamicModalObj} />
            case 'add-column':
                return <AddColumnModal dynamicModalObj={dynamicModalObj} />
            case 'remove-column':
                return <RemoveColumnModal dynamicModalObj={dynamicModalObj} />
            case 'menu-task':
                return <TaskMenuModal dynamicModalObj={dynamicModalObj} />
            case 'member-modal':
                return <ModalMember dynamicModalObj={dynamicModalObj} />
            case 'status':
                return <ModalStatusPriority dynamicModalObj={dynamicModalObj} />
            case 'priority':
                return <ModalStatusPriority dynamicModalObj={dynamicModalObj} />
            case 'add-group':
                return <AddGroupModal dynamicModalObj={dynamicModalObj} />
            case 'member-filter':
                return <MemberFilterModal dynamicModalObj={dynamicModalObj} />
            case 'chart-type':
                return <ChartTypeModal dynamicModalObj={dynamicModalObj} />
            case 'board-menu':
                return <BoardMenuModal dynamicModalObj={dynamicModalObj} />
            default: return
        }
    }

    return (
        <>
            {dynamicModalObj.isOpen &&
                <div className="dynamic-modal" style={{ left: dynamicModalObj.pos.x, top: dynamicModalObj.pos.y }}>
                    {getDynamicModalByType(dynamicModalObj.type)}
                </div>
            }
        </>
    )
}
