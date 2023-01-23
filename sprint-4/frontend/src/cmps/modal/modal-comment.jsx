import { useState } from 'react'

import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'

export function GroupMenuModal({ groupId, onRemoveGroup, onDuplicateGroup, onChangeGroupColor , isShowColorPicker}) {

    return (
        <section className="group-menu-modal">
            {!isShowColorPalette &&
                <>
                    <div className='color' onClick={() => setIsShowColorPalette(!isShowColorPalette)}>
                        <BsFillCircleFill style={{ color: 'yellow' }} />
                        <span>Change group color</span>
                    </div>
                    <div className="duplicate" onClick={() => onDuplicateGroup(groupId)}>
                        <HiOutlineDocumentDuplicate />
                        <span>Duplicate this group</span>
                    </div>
                    <div className="delete" onClick={() => onRemoveGroup(groupId)}>
                        <RiDeleteBinLine />
                        <span>Delete</span>
                    </div>
                </>
            }
        </section>
    )
}