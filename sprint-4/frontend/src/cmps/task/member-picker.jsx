import { useState } from "react"
import { useSelector } from "react-redux"
import { ModalMember } from "../modal-member"

const guest = require('../../assets/img/guest.png')

export function MemberPicker({ info, onUpdate }) {
    const board = useSelector(storeState => storeState.boardModule.board)
    const [isModalOpen, setIsModalOpen] = useState(false)

    if (!info.memberIds) return <div onClick={() => setIsModalOpen(true)} style={{width: '87px'}} className="picker task-person"></div>
    const members = info.memberIds.map(member => getMember(member))
    function getMember(memberId) {
        return board.members.find(member => member.id === memberId)
    }

    return (
        <section className="flex members-imgs justify-center picker task-person">
            {members.length === 0 && <img className='member-img1' src={guest} alt="member" onClick={() => setIsModalOpen(!isModalOpen)} />}
            {members.length > 0 && <img className='member-img1' src={!members.length ? guest : members[0].imgUrl} alt="member" onClick={() => setIsModalOpen(true)} />}
            {members.length === 2 && <img className='member-img2' src={members.length <= 1 ? guest : members[1].imgUrl} alt="member" onClick={() => setIsModalOpen(true)}/>}
            {members.length > 2 && <div className='show-more-members' onClick={() => setIsModalOpen(!isModalOpen)}>
                <span className='show-more-count'>+{members.length - 1}</span>
            </div>}
            {isModalOpen && <ModalMember taskMembers={members} onUpdate={onUpdate} setIsModalOpen={setIsModalOpen} cmpType={'memberIds'}/>}
        </section>
    )
}

