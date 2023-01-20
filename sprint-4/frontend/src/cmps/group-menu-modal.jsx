import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'
import { removeGroup } from '../store/board.actions'

export function GroupMenuModal({ groupId , onRemoveGroup }) {

    return (<section className="group-menu-modal">
        <div clasName="duplicate">
            <HiOutlineDocumentDuplicate />
            <span>Duplicate this group</span>
        </div>
        <div className="delete">
            <RiDeleteBinLine />
            <span onClick={() => onRemoveGroup(groupId)}>Delete</span>
        </div>
    </section>
    )
}