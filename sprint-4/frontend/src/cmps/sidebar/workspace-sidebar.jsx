import { useSelector } from 'react-redux'
import { useRef, useState } from 'react'

import { loadBoards, saveBoard } from '../../store/board.actions'
import { boardService } from '../../services/board.service'

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'

import { BoardPreview } from '../board/board-preview'

export function WorkspaceSidebar() {
    const elSection = useRef(null)
    const [isOpen, setIsOpen] = useState(false)
    const boards = useSelector(storeState => storeState.boardModule.boards)

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

    return (
        <section ref={elSection} className="workspace-sidebar close">
            <div onClick={onToggleWorkspace} className='toggle-workspace'>
                {isOpen && <MdKeyboardArrowLeft />}
                {!isOpen && <MdKeyboardArrowRight />}
            </div>
            {isOpen && <div className="workspace-sidebar-header">
                <div className='workspace-sidebar-items'>
                    <div className="flex space-between">
                        <span className='workspace-title'>Workspace</span>
                        <BiDotsHorizontalRounded />
                    </div>
                    <div className='chose-board'>
                        <h5>Sprint 4</h5>
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
                        <div>
                            <BiSearch className='icon' />
                            <span>Search</span>
                        </div>
                    </div>
                </div>
                <div>
                    {boards.map(board => {
                        return  <li className='board-list'>
                            <BoardPreview board={board}/>
                        </li>})}
                </div>
            </div>}
        </section>
    )
}