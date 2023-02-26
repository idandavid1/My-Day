import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { loadBoard, saveBoard } from "../../store/board.actions"

import { VscTriangleUp } from 'react-icons/vsc'
import { CiSearch } from 'react-icons/ci'
import { CgClose } from 'react-icons/cg'

export function ModalMemberInvite({ board, setIsInviteModalOpen }) {
    const [filter, setFilter] = useState({ txt: '' })
    const [outBoardMembers, setOutBoardMembers] = useState([])
    const users = useSelector(storeState => storeState.userModule.users)

    useEffect(() => {
        setOutBoardMembers(users.filter(user => !board.members.some(member => member._id === user._id)))
    }, [])

    async function onRemoveMember(removeMemberId) {
        try {
            board.members = board.members.filter(member => member._id !== removeMemberId)
            board.groups.forEach(group => {
                group.tasks.forEach(task => task.memberIds = removeMemberFromTask(task, removeMemberId))
            })
            await saveBoard(board)
            loadBoard(board._id)
            setIsInviteModalOpen(false)
        } catch (err) {
            console.log('cant save board:', err)
        }
    }

    function removeMemberFromTask(task, removeMemberId) {
        return task.memberIds.filter(memberId => memberId !== removeMemberId)
    }

    async function onAddMember(member) {
        try {
            board.members.push(member)
            await saveBoard(board)
            loadBoard(board._id)
            setIsInviteModalOpen(false)
        } catch (err) {
            console.log('cant save board:', err)
        }
        
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
            <CgClose className="close-btn" onClick={() => setIsInviteModalOpen(false)} />
            <VscTriangleUp className="triangle-icon" />
            <section className="modal-member-content" >
                <ul className="taskMembers flex">
                    {
                        board.members.map(member => {
                            return <li key={member._id}>
                                <img src={member.imgUrl} alt="member-img" />
                                <span>{member.fullname}</span>
                                <span onClick={() => onRemoveMember(member._id)} className="remove">x</span>
                            </li>
                        })
                    }
                </ul>
                <div className="outTaskMembers">
                    <form className="search-div flex space-between" onSubmit={onSubmit}>
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
                                    <img src={member.imgUrl} alt="member-img"/>
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