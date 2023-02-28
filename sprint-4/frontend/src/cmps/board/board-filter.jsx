import { addTaskOnFirstGroup, setDynamicModalObj } from '../../store/board.actions'
import { useRef, useState } from 'react'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { utilService } from '../../services/util.service'

import { FaAngleDown } from 'react-icons/fa'
import { TfiSearch } from 'react-icons/tfi'
import { BsPersonCircle } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { useSelector } from 'react-redux'

export function BoardFilter({ board, onSetFilter }) {
    const filter = useSelector(storeState => storeState.boardModule.filter)
    const [filterBy, setFilterBy] = useState(filter)
    const [memberFilter, setMemberFilter] = useState(null)
    const dynamicModalObj = useSelector(storeState => storeState.boardModule.dynamicModalObj)
    const elBoardFilter = useRef()
    const elMemberFilter = useRef()
    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffectUpdate(() => {
        onSetFilter.current(filterBy)
        loadMemberImg()
    }, [filterBy])

    function loadMemberImg() {
        const member = board.members.find(member => member._id === filterBy.memberId)
        setMemberFilter(member)
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onRemovePersonFilter(ev) {
        ev.stopPropagation()
        filter.memberId = ''
        onSetFilter.current(filter)
        setMemberFilter(null)
    }

    function onToggleMenuModal() {
        const isOpen = dynamicModalObj?.type === 'add-group' ? !dynamicModalObj.isOpen : true
        const { x, y, height } = elBoardFilter.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x + 80), y: (y + height) }, type: 'add-group' })
    }

    function onToggleMemberFilterModal() {
        const isOpen = dynamicModalObj?.type === 'member-filter' ? !dynamicModalObj.isOpen : true
        const { x, y } = elMemberFilter.current.getClientRects()[0]
        setDynamicModalObj({ isOpen, pos: { x: (x - 160), y: (y + 40) }, type: 'member-filter', filterBy: filterBy, setFilterBy: setFilterBy })
    }

    function isMemberModalOpen() {
        return dynamicModalObj.isOpen && dynamicModalObj.type === 'member-filter'
    }

    return (
        <section ref={elBoardFilter} className="board-filter flex align-center">
            <div className="add-btn">
                <span className='new-task-btn' onClick={() => addTaskOnFirstGroup(board)}>New Task</span>
                <div className='drop-down-btn' onClick={onToggleMenuModal}>
                    <FaAngleDown className="icon" />
                </div>
            </div>
            <div className='board-tools flex align-center'>
                <div className='search-task'>
                    <TfiSearch className='icon' />
                    <input type="text"
                        name='title'
                        value={filterBy.title}
                        placeholder="Search"
                        onChange={handleChange} />
                </div>
                <div ref={elMemberFilter} onClick={onToggleMemberFilterModal} className={`person-filter ${(isMemberModalOpen() || filterBy.memberId) ? ' active' : ''}`}>
                    {!memberFilter && <BsPersonCircle className='icon' />}
                    {memberFilter && <img className='member-img' src={memberFilter.imgUrl} alt="" />}
                    <span>Person</span>
                    {filterBy.memberId && <AiFillCloseCircle onClick={onRemovePersonFilter} />}
                </div>
            </div>
        </section>
    )
}