import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

import { setDynamicModalObj } from "../../store/board.actions"
import { CiSearch } from 'react-icons/ci'
import { VscTriangleUp } from 'react-icons/vsc'

export function ModalMember({ dynamicModalObj }) {

    const [filter, setFilter] = useState({ txt: '' })
    const [outTaskMembers, setOutTaskMembers] = useState([])
    const board = useSelector(storeState => storeState.boardModule.board)
    const [taskMembers, setTaskMembers] = useState(dynamicModalObj.task.memberIds.map(member => getMember(member)))

    useEffect(() => {
        setOutTaskMembers(board.members.filter(member => !taskMembers.includes(member)))
    }, [])

    function getMember(memberId) {
        return board.members.find(member => member._id === memberId)
    }

    function onRemoveMember(RemoveTaskMember) {
        dynamicModalObj.activity.from = 'Remove'
        dynamicModalObj.activity.to = RemoveTaskMember.imgUrl
        const members = taskMembers.filter(taskMember => taskMember._id !== RemoveTaskMember._id)
        const membersIds = members.map(taskMember => taskMember._id)
        dynamicModalObj.onTaskUpdate('memberIds', membersIds, dynamicModalObj.activity)
        dynamicModalObj.isOpen = false
        setDynamicModalObj(dynamicModalObj)
    }

    function onAddMember(taskMember) {
        dynamicModalObj.activity.from = 'Added'
        dynamicModalObj.activity.to = taskMember.imgUrl
        taskMembers.push(taskMember)
        const membersIds = taskMembers.map(taskMember => taskMember._id)
        dynamicModalObj.onTaskUpdate('memberIds', membersIds, dynamicModalObj.activity)
        dynamicModalObj.isOpen = false
        setDynamicModalObj(dynamicModalObj)
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
            <VscTriangleUp className="triangle-icon"/>
            <section className="modal-member-content" >
                <ul className="taskMembers">
                    {
                        taskMembers.map(taskMember => {
                            return <li key={taskMember._id}>
                                <img src={taskMember.imgUrl} alt="member-img" />
                                <span>{taskMember.fullname}</span>
                                <span onClick={() => onRemoveMember(taskMember)} className="remove">x</span>
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
                    {outTaskMembers.length > 0 && <ul className="out-member-list">
                        {
                            outTaskMembers.map(taskMember => {
                                return <li key={taskMember._id} onClick={() => onAddMember(taskMember)}>
                                    <img src={taskMember.imgUrl} alt="member-img" />
                                    <span>{taskMember.fullname}</span>
                                </li>
                            })
                        }
                    </ul>}
                </div>
            </section>
        </section>
    )
}