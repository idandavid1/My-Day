import { useSelector } from 'react-redux'
import { useEffect, useRef, useState } from 'react'

import { loadBoards, saveBoard } from '../../store/board.actions'
import { boardService } from '../../services/board.service'

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { BsFillLightningFill } from 'react-icons/bs'
import { AiFillHome } from 'react-icons/ai'

import { BoardPreview } from '../board/board-preview'

export function WorkspaceSidebar() {
    const elSection = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const [filterByToEdit, setFilterByToEdit] = useState(boardService.getDefaultFilterBoard())
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards(filterByToEdit)
    }, [filterByToEdit])

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

    function handleChange({target}) {
        let {value , name:field} = target
        setFilterByToEdit((prevFilter) => ({...prevFilter , [field]:value}))
    }

    return (
        <section ref={elSection} className="workspace-sidebar close">
            <div onClick={onToggleWorkspace} className='toggle-workspace'>
                {isOpen && <MdKeyboardArrowLeft />}
                {!isOpen && <MdKeyboardArrowRight />}
            </div>
            {isOpen && <div className="workspace-sidebar-header">
                <div className='workspace-sidebar-items'>
                    <div className="workspace-title-container flex space-between align-center">
                        <span className='workspace-title'>Workspace</span>
                        <BiDotsHorizontalRounded className='icon'/>
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
                <div>
                    {boards.map(board => {
                        return <li key={board._id} className='board-list'>
                            <BoardPreview board={board} />
                        </li>
                    })}
                </div>
            </div>}
        </section>
    )
}