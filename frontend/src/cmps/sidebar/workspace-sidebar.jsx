import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { BoardPreview } from '../board/board-preview'
import { loadBoards } from '../../store/board.actions'
import { boardService } from '../../services/board.service'

import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import star from '../../assets/img/star.gif'
import { BsStarFill } from 'react-icons/bs'
import WorkspaceBoard from './workspace/workspace-board'

export function WorkspaceSidebar ({ workspaceDisplay, setIsCreateModalOpen, setIsWorkspaceOpen, isWorkspaceOpen, setWorkspaceDisplay }) {
    const [filterByToEdit, setFilterByToEdit] = useState(boardService.getDefaultFilterBoards())
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards(filterByToEdit)
    }, [filterByToEdit])

    function onToggleWorkspace () {
        setIsWorkspaceOpen((prevIsOpen) => !prevIsOpen)
    }

    function handleChange ({ target }) {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    return (
        <section className={`workspace-sidebar ${isWorkspaceOpen ? 'open' : 'close'}`}>
            <div data-title={isWorkspaceOpen ? 'Close navigation' : 'Open navigation'} onClick={onToggleWorkspace} className='toggle-workspace '>
                {isWorkspaceOpen && <MdKeyboardArrowLeft />}
                {!isWorkspaceOpen && <MdKeyboardArrowRight />}
            </div>
            {workspaceDisplay === 'board' ? (<WorkspaceBoard handleChange={handleChange}
                filterByToEdit={filterByToEdit} boards={boards} setIsCreateModalOpen={setIsCreateModalOpen}/>)
                : (<div className="workspace-sidebar-header">
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
                </div>)}
        </section>
    )
}
