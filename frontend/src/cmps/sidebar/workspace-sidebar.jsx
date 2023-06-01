import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { loadBoards } from '../../store/board.actions'
import { boardService } from '../../services/board.service'

import { MdKeyboardArrowRight } from 'react-icons/md'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import WorkspaceBoard from './workspace/workspace-board'
import { useCallback } from 'react'
import WorkspaceFavorite from './workspace/workspace-favorite'
import { Tooltip } from '@mui/material'

export function WorkspaceSidebar ({ workspaceDisplay, setIsCreateModalOpen, setIsWorkspaceOpen, isWorkspaceOpen, setWorkspaceDisplay }) {
    const [filterByToEdit, setFilterByToEdit] = useState(boardService.getDefaultFilterBoards())
    const boards = useSelector(storeState => storeState.boardModule.boards)

    useEffect(() => {
        loadBoards(filterByToEdit)
    }, [filterByToEdit])

    function onToggleWorkspace () {
        setIsWorkspaceOpen((prevIsOpen) => !prevIsOpen)
    }

    const handleChange = useCallback(({ target }) => {
        let { value, name: field } = target
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }, [])

    return (
        <section className={`workspace-sidebar ${isWorkspaceOpen ? 'open' : 'close'}`}>
            <Tooltip title={isWorkspaceOpen ? 'Close navigation' : 'Open navigation'} arrow>
                <div onClick={onToggleWorkspace} className='toggle-workspace '>
                    {isWorkspaceOpen && <MdKeyboardArrowLeft />}
                    {!isWorkspaceOpen && <MdKeyboardArrowRight />}
                </div>
            </Tooltip>
            {workspaceDisplay === 'board' ?
                (<WorkspaceBoard handleChange={handleChange}
                    filterByToEdit={filterByToEdit} boards={boards} setIsCreateModalOpen={setIsCreateModalOpen} />)
                :
                (<WorkspaceFavorite boards={boards} />)}
        </section>
    )
}
