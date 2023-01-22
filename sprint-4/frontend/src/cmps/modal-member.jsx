import { useSelector } from "react-redux"

import { VscTriangleUp } from 'react-icons/vsc'
import { CiSearch } from 'react-icons/ci'
import { useEffect, useState } from "react"


export function ModalMember({taskMembers, cmpType, onUpdate, setIsModalOpen}) {
    const [filter, setFilter] = useState({txt: ''})
    const [outTaskMembers, setOutTaskMembers] = useState([])
    const board = useSelector(storeState => storeState.boardModule.board)
    
    useEffect(() => {
        setOutTaskMembers(board.members.filter(member => !taskMembers.includes(member)))
    }, [])

    function onRemoveMember(taskMemberId) {
        const members = taskMembers.filter(taskMember => taskMember.id !== taskMemberId)
        const membersIds = members.map(taskMember => taskMember.id)
        onUpdate(cmpType, membersIds)
        setIsModalOpen(false)
    }

    function onAddMember(taskMember) {
        taskMembers.push(taskMember)
        const membersIds = taskMembers.map(taskMember => taskMember.id)
        onUpdate(cmpType, membersIds)
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
            <VscTriangleUp className="triangle-icon"/>
            <section className="modal-member-content" >
                <ul className="taskMembers">
                    {
                        taskMembers.map(taskMember => {
                            return <li key={taskMember.id}>
                                <img src={taskMember.imgUrl} />
                                <span>{taskMember.fullname}</span>
                                <span onClick={() => onRemoveMember(taskMember.id)} className="remove">x</span>
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
                        <button className="icon-container"><CiSearch className="icon"/></button>
                    </form>
                    <span>Suggested people</span>
                    {outTaskMembers.length > 0 && <ul>
                        {
                            outTaskMembers.map(taskMember => {
                               return  <li key={taskMember.id} onClick={() => onAddMember(taskMember)}>
                                    <img src={taskMember.imgUrl} />
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