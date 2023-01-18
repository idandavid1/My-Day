import { BiDotsHorizontalRounded } from 'react-icons/bi'
import { IoIosArrowDown } from 'react-icons/io'
import { AiOutlinePlus } from 'react-icons/ai'
import { FiFilter } from 'react-icons/fi'
import { BiSearch } from 'react-icons/bi'
import { MdKeyboardArrowLeft } from 'react-icons/md'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { useRef } from 'react'
import { useState } from 'react'


export function WorkspaceSidebar() {
    const elSection = useRef(null)
    const [isOpen, setIsOpen] = useState(false)

    function onToggleWorkspace() {
        setIsOpen((prevIsOpen) => !prevIsOpen)
        elSection.current.classList.toggle('close')
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
                        <IoIosArrowDown className='icon'/>
                    </div>

                    <div className='workspace-btns'>
                        <div >
                            <AiOutlinePlus className='icon'/>
                            <span>Add</span>
                        </div>
                        <div>
                            <FiFilter className='icon'/>
                            <span>Filters</span>
                        </div>
                        <div>
                            <BiSearch className='icon'/>
                            <span>Search</span>
                        </div>
                    </div>
                </div>
                <div className='board-list'>
                    <div className='active'>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clipRule="evenodd" d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" />
                        </svg>
                        <span>Sprint 4</span>
                    </div>
                    <div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clipRule="evenodd" d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" />
                        </svg>
                        <span>Sprint 4 Dashboard</span>
                    </div>
                    <div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clipRule="evenodd" d="M7.5 4.5H16C16.2761 4.5 16.5 4.72386 16.5 5V15C16.5 15.2761 16.2761 15.5 16 15.5H7.5L7.5 4.5ZM6 4.5H4C3.72386 4.5 3.5 4.72386 3.5 5V15C3.5 15.2761 3.72386 15.5 4 15.5H6L6 4.5ZM2 5C2 3.89543 2.89543 3 4 3H16C17.1046 3 18 3.89543 18 5V15C18 16.1046 17.1046 17 16 17H4C2.89543 17 2 16.1046 2 15V5Z" fill="currentColor" />
                        </svg>
                        <span>Demo Data</span>
                    </div>
                </div>
            </div>}
        </section>
    )
}