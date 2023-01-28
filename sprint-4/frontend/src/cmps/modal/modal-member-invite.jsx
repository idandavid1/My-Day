import { useSelector } from "react-redux"

import { VscTriangleUp } from 'react-icons/vsc'
import { CiSearch } from 'react-icons/ci'
import { useEffect, useState } from "react"


export function ModalMember({ board }) {
    const [filter, setFilter] = useState({ txt: '' })
    const [outBoardMembers, setOutBoardMembers] = useState([])
    const users = useSelector(storeState => storeState.userModule.users)

    useEffect(() => {
        setOutBoardMembers(users.filter(user => !board.members.some(member => member._id === user._id)))
    }, [])

    function onRemoveMember(RemoveTaskMember) {
        activity.from = 'Remove'
        activity.to = RemoveTaskMember.imgUrl
        const members = taskMembers.filter(taskMember => taskMember._id !== RemoveTaskMember._id)
        const membersIds = members.map(taskMember => taskMember._id)
        onUpdate(cmpType, membersIds, activity)
        setIsModalOpen(false)
    }

    function onAddMember(taskMember) {
        activity.from = 'Added'
        activity.to = taskMember.imgUrl
        taskMembers.push(taskMember)
        const membersIds = taskMembers.map(taskMember => taskMember._id)
        onUpdate(cmpType, membersIds, activity)
        setIsModalOpen(false)
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilter((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onSubmit(ev) {
        ev.preventDefault()
        console.log('filter:', filter)
        let members = board.members.filter(member => !taskMembers.includes(member))
        if (filter.txt) {
            const regex = new RegExp(filter.txt, 'i')
            members = members.filter(member => regex.test(member.fullname))
        }
        setOutTaskMembers(members)
    }

    return (
        <section className="modal-member">
            <VscTriangleUp className="triangle-icon" />
            <section className="modal-member-content" >
                <ul className="taskMembers">
                    {
                        board.members.map(member => {
                            return <li key={member._id}>
                                <img src={member.imgUrl} />
                                <span>{member.fullname}</span>
                                <span onClick={() => onRemoveMember(member)} className="remove">x</span>
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
                    {outBoardMembers.length > 0 && <ul>
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