import { addGroup, addTaskOnFirstGroup } from '../../store/board.actions'
import { useRef, useState } from 'react'
import { useEffectUpdate } from '../../customHooks/useEffectUpdate'
import { utilService } from '../../services/util.service'

import { FaAngleDown } from 'react-icons/fa'
import { TfiSearch } from 'react-icons/tfi'
import { BsPersonCircle } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'
import { CgViewComfortable } from 'react-icons/cg'
import { BsArrowDownCircle } from 'react-icons/bs'
import { useSelector } from 'react-redux'
import { MemberFilterModal } from '../modal/person-filter-modal'

export function BoardFilter({ board, onSetFilter }) {
    const [isShowModal, setIsShowModal] = useState(false)
    const filter = useSelector(storeState => storeState.boardModule.filter)
    const [filterBy, setFilterBy] = useState(filter)
    const [isMemberModal, setIsMemberModal] = useState(false)
    const [memberFilter, setMemberFilter] = useState(null)

    onSetFilter = useRef(utilService.debounce(onSetFilter))

    useEffectUpdate(() => {
        onSetFilter.current(filterBy)
        loadMemberImg()
    }, [filterBy])

    async function onAddGroup() {
        try {
            addGroup(board)
            setIsShowModal(false)
        } catch (err) {
            console.log('cant add group:', err)
        }
        
    }

    function loadMemberImg() {
        const member = board.members.find(member => member._id === filterBy.memberId)
        setMemberFilter(member)
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterBy((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onRemovePersonFilter() {
        filter.memberId = ''
        onSetFilter.current(filter)
        setMemberFilter(null)
    }

    return (<section className="board-filter flex align-center">
        <div className="add-btn">
            <span className='new-task-btn' onClick={() => addTaskOnFirstGroup(board)}>New Task</span>
            <div className='drop-down-btn' onClick={() => setIsShowModal(!isShowModal)}>
                <FaAngleDown className="icon" />
            </div>
            {isShowModal && <div className='add-group-modal'>
                <div className='add-group' onClick={onAddGroup}>
                    <CgViewComfortable className='icon' />
                    <span>New group of Tasks</span>
                </div>
                <div className='import-tasks'>
                    <BsArrowDownCircle className='icon' />
                    <span>Import tasks</span>
                </div>
            </div>}
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
            <div className={`person-filter ${(isMemberModal || filterBy.memberId) ? ' active' : ''}`}>
                {!memberFilter && <BsPersonCircle className='icon' />}
                {memberFilter && <img className='member-img' src={memberFilter.imgUrl} alt="" />}
                <span onClick={() => setIsMemberModal(!isMemberModal)}>Person</span>
                {isMemberModal && <MemberFilterModal filterBy={filterBy} setFilterBy={setFilterBy}/>}
                {(!isMemberModal && filterBy.memberId) && <AiFillCloseCircle onClick={onRemovePersonFilter} />}
            </div>
        </div>
    </section>
    )
}