import { useSelector } from "react-redux"
const guest = require('../../assets/img/guest.png')




export function MemberPicker({ info, onUpdate }) {
    const boards = useSelector(storeState => storeState.boardModule.boards)
    const members = info.memberIds ? info.memberIds.map(member => getMember(member)) : []

    function getMember(memberId) {
        console.log(memberId)
        return boards[0].members.find(member => member._id === memberId)
    }

    return (
        <section className="member-picker">
            {members.length > 0 && <div>
                <img className='member-img1' src={guest} alt="" />
            </div>}
            {members.length === 1 && <div>
                <img className='member-img2' src={guest} alt="" />
            </div>}
            {members.length > 1 &&
                <div className='show-more-members'>
                    <span className='show-more-count'>+{members.length - 1}</span>
                </div>}
        </section>
    )
}

