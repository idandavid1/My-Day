import { useSelector } from "react-redux"

import { VscTriangleUp } from 'react-icons/vsc'
import { CiSearch } from 'react-icons/ci'
import { useEffect, useState } from "react"
import { loadBoard, saveBoard } from "../../store/board.actions"


export function ModalMemberInvite({ board, setIsInviteModalOpen }) {
    const [filter, setFilter] = useState({ txt: '' })
    const [outBoardMembers, setOutBoardMembers] = useState([])
    const users = useSelector(storeState => storeState.userModule.users)

    useEffect(() => {
        console.log('users:', users)
        setOutBoardMembers(users.filter(user => !board.members.some(member => member._id === user._id)))
    }, [])

    function onRemoveMember(removeMemberId) {
        board.members = board.members.filter(member => member._id !== removeMemberId)
        saveBoard(board)
        loadBoard(board)
        setIsInviteModalOpen(false)
    }

    function onAddMember(member) {
        board.members.push(member)
        saveBoard(board)
        loadBoard(board)
        setIsInviteModalOpen(false)
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilter((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        let members = users.filter(user => !board.members.some(member => member._id === user._id))
        if (filter.txt) {
            const regex = new RegExp(filter.txt, 'i')
            members = members.filter(member => regex.test(member.fullname))
        }

        setOutBoardMembers(members)
    }

    return (
        <section className="modal-member invite">
            <VscTriangleUp className="triangle-icon" />
            <section className="modal-member-content" >
                <ul className="taskMembers">
                    {
                        board.members.map(member => {
                            return <li key={member._id}>
                                <img src={member.imgUrl} />
                                <span>{member.fullname}</span>
                                <span onClick={() => onRemoveMember(member._id)} className="remove">x</span>
                            </li>
                        })
                    }
                </ul>
                <div className="outTaskMembers">
                    <form className="search-div" onSubmit={onSubmit}>
                        <input type="text"
                            placeholder="Search names"
                            name="txt"
                            value={filter.txt}
                            onChange={handleChange}
                        />
                        <button className="icon-container"><CiSearch className="icon" /></button>
                    </form>
                    <span>Suggested people</span>
                    {outBoardMembers.length > 0 && <ul className="out-member-list">
                        {
                            outBoardMembers.map(member => {
                                return <li key={member.id} onClick={() => onAddMember(member)}>
                                    <img src={member.imgUrl} />
                                    <span>{member.fullname}</span>
                                </li>
                            })
                        }
                    </ul>}
                </div>
            </section>
        </section>
    )
}