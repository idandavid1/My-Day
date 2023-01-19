import { useSelector } from "react-redux"

const guest = require('../../assets/img/guest.png')

export function MemberPicker({ info, onUpdate }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    if (!info.memberIds) return <div className="picker task-person"></div>
    const members = info.memberIds ? info.memberIds.map(member => getMember(member)) : []

    function getMember(memberId) {
        return boards[0].members.find(member => member._id === memberId)
    }

    return (
        <section className="flex members-imgs justify-center picker task-person">
            {members.length > 0 && <img className='member-img1' src={!members.length ? guest : members[0].imgUrl} alt="member" />}
            {members.length === 2 && <img className='member-img2' src={members.length <= 1 ? guest : members[1].imgUrl} alt="member" />}
            {members.length > 1 && <div className='show-more-members'>
                <span className='show-more-count'>+{members.length - 1}</span>
            </div>}
        </section>
    )
}

