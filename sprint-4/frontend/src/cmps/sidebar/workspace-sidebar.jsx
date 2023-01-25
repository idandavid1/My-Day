import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

import { loadBoards, saveBoard, toggleStarred } from '../../store/board.actions'
import { boardService } from '../../services/board.service'
import { BoardPreview } from '../board/board-preview'

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BsFillLightningFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'
import { BsStarFill } from 'react-icons/bs'
import star from '../../assets/img/star.gif'

export function WorkspaceSidebar({ isOpen, setIsOpen, isStarredOpen }) {
    const elSection = useRef(null)

    const [filterByToEdit, setFilterByToEdit] = useState(boardService.getDefaultFilterBoards())

    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        if (isStarredOpen) onLoadBoards()
        else loadBoards(filterByToEdit)
    }, [filterByToEdit, isStarredOpen])

    async function onAddBoard() {
        try {
            const newBoard = boardService.getEmptyBoard()
            await saveBoard(newBoard)
            loadBoards()
        } catch (err) {
            console.log('err:', err)
        }
    }

    function onToggleWorkspace() {
        setIsOpen((prevIsOpen) => !prevIsOpen)
        elSection.current.classList.toggle('close')
        elSection.current.classList.toggle('open')
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
        <section ref={elSection} className="workspace-sidebar close">
            <div onClick={onToggleWorkspace} className='toggle-workspace'>
                {isOpen && <MdKeyboardArrowLeft />}
                {!isOpen && <MdKeyboardArrowRight />}
            </div>
            {isOpen && !isStarredOpen && <div className="workspace-sidebar-header">
                <div className='workspace-sidebar-items'>
                    <div className="workspace-title-container flex space-between align-center">
                        <span className='workspace-title'>Workspace</span>
                        <BiDotsHorizontalRounded className='icon' />
                    </div>
                    <div className='chose-workspace'>
                        <div className='left'>
                            <div className='lightning-container'>
                                <BsFillLightningFill />
                            </div>
                            <AiFillHome className='home' />
                            <h5>Sprint 4</h5>
                        </div>
                        <IoIosArrowDown className='icon' />
                    </div>
                    <div className='workspace-btns'>
                        <div onClick={onAddBoard} >
                            <AiOutlinePlus className='icon' />
                            <span>Add</span>
                        </div>
                        <div>
                            <FiFilter className='icon' />
                            <span>Filters</span>
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
                <ul className='board-list-container'>
                    {boards.map(board => {
                        return <li key={board._id} className='board-list'>
                            <BoardPreview board={board} />
                        </li>
                    })}
                </ul>
            </div>}
            {isOpen && isStarredOpen && <div className="workspace-sidebar-header">
                {console.log(isOpen, isStarredOpen)}
                <div className='workspace-sidebar-items'>
                    <div className="workspace-title-container flex space-between align-center">
                        <span className='favorites-title'><BsStarFill className="star-icon" /> Favorites</span>
                        <BiDotsHorizontalRounded className='icon' />
                    </div>
                </div>
                {boards.length === 0 && <div className="favorites-empty">
                    <img className="star-icon" src={star} />
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