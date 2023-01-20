import { HiOutlineDocumentDuplicate } from 'react-icons/hi'
import { RiDeleteBinLine } from 'react-icons/ri'

export function GroupMenuModal({ groupId }) {



    return (<section className="group-menu-modal">
        <div clasName="duplicate">
            <HiOutlineDocumentDuplicate />
            <span>Duplicate this group</span>
        </div>
        <div className="delete">
            <RiDeleteBinLine />
            <span>Delete</span>
        </div>
    </section>
    )
}