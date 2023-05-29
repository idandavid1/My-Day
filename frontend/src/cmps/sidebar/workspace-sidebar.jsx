import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { BoardPreview } from '../board/board-preview'
import { loadBoards } from '../../store/board.actions'
import { boardService } from '../../services/board.service'

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BsFillLightningFill } from 'react-icons/bs'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import star from '../../assets/img/star.gif'
import { AiFillHome } from 'react-icons/ai'
import { BsStarFill } from 'react-icons/bs'
import { BiSearch } from 'react-icons/bi'

export function WorkspaceSidebar({ isOpen, setIsOpen, isStarredOpen, setIsCreateModalOpen }) {
    const [filterByToEdit, setFilterByToEdit] = useState(boardService.getDefaultFilterBoards())
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        if (isStarredOpen) onLoadBoards()
        else loadBoards(filterByToEdit)
    }, [filterByToEdit, isStarredOpen])

    function onToggleWorkspace() {
        setIsOpen((prevIsOpen) => !prevIsOpen)
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    function onLoadBoards() {
        try {
            const filter = boardService.getDefaultFilterBoards()
            filter.isStarred = true
            loadBoards(filter)
        } catch (err) {
            throw err
        }
    }

    return (
        <section className={`workspace-sidebar ${isOpen ? 'open' : 'close'}`}>
            <div data-title={isOpen ? 'Close navigation' : 'Open navigation'} onClick={onToggleWorkspace} className='toggle-workspace '>
                {isOpen && <MdKeyboardArrowLeft />}
                {!isOpen && <MdKeyboardArrowRight />}
            </div>
            {!isStarredOpen && <div className="workspace-sidebar-header">
                <div className='workspace-sidebar-items'>
                    <div className="workspace-title-container flex space-between align-center">
                        <span className='workspace-title'>Workspace</span>
                    </div>
                    <div className='workspace-select flex space-between align-center'>
                        <div className='workspace-logo flex align-items'>
                            <div className='lightning-container'>
                                <BsFillLightningFill />
                            </div>
                            <AiFillHome className='home' />
                            <h5 className='workspace-title'>Sprint 4</h5>
                        </div>
                        <IoIosArrowDown className='icon' />
                    </div>
                    <div className='workspace-btns'>
                        <div onClick={() => setIsCreateModalOpen((prev) => !prev)} >
                            <AiOutlinePlus className='icon' />
                            <span>Add</span>
                        </div>
                        <div className='search-board'>
                            <BiSearch className='icon' />
                            <input type="text"
                                name='title'
                                value={filterByToEdit.title}
                                placeholder="Search"
                                onChange={handleChange}
                            />
                        </div>
                    </div>
                </div>
                <ul className='board-list-container flex column'>
                    {boards.map(board => {
                        return <li key={board._id} className='board-list'>
                            <BoardPreview board={board} />
                        </li>
                    })}
                </ul>
            </div>}
            {isStarredOpen && <div className="workspace-sidebar-header">
                <div className='workspace-sidebar-items'>
                    <div className="workspace-title-container flex space-between align-center">
                        <span className='favorites-title flex align-center'><BsStarFill className="star-icon" /> Favorites</span>
                        <BiDotsHorizontalRounded className='icon' />
                    </div>
                </div>
                {boards.length === 0 && <div className="favorites-empty flex column align-center">
                    <img className="star-icon" src={star} alt="star-img" />
                    <div className="favorites-empty-text">
                        <b>No favorite boards yet</b>
                        <p>"Star" any board so that you
                            can easily access it later</p>
                    </div>
                </div>}
                <ul className='board-list-container'>
                    {boards.map(board => {
                        return <li key={board._id} className='board-list'>
                            <BoardPreview board={board} />
                        </li>
                    })}
                </ul>
            </div>}
        </section>
    )
}
