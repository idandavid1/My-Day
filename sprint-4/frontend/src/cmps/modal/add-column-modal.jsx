import { useEffect, useState } from 'react'

import { ImFilesEmpty } from 'react-icons/im'
import { CiCalculator2, CiCalendarDate } from 'react-icons/ci'
import { RxCountdownTimer } from "react-icons/rx"
import { BsCheckSquare } from "react-icons/bs"
import { HiOutlineUserCircle } from 'react-icons/hi'
import { loadBoard, saveBoard, setDynamicModalObj } from '../../store/board.actions'
import { useSelector } from 'react-redux'

const statusImg = require('../../assets/img/status.png')

export function AddColumnModal({ dynamicModalObj }) {
    const [columns, setColumns] = useState([])
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)

    useEffect(() => {
        loadColumns()
    }, [])

    function loadColumns() {
        const columns = board.cmpsOption.filter(cmpOption => {
            return !board.cmpsOrder.includes(cmpOption)
        })
        setColumns(columns)
    }

    async function addColumn(columnType) {
        try {
            board.cmpsOrder.push(columnType)
            await saveBoard(board)
            loadBoard(board._id)
            dynamicModalObj.isOpen = false
            setDynamicModalObj(dynamicModalObj)
        } catch (err) {
            console.log(err)
        }
    }

    function getIconAction(column) {
        switch (column) {
            case 'status-picker':
                return (
                    <div onClick={() => addColumn('status-picker')}>
                        <img src={statusImg} alt="" />
                        Status
                    </div>
                )
            case 'priority-picker':
                return (
                    <div onClick={() => addColumn('priority-picker')}>
                        <img src={statusImg} alt="" />
                        Priority
                    </div>
                )
            case 'date-picker':
                return (
                    <div onClick={() => addColumn('date-picker')}>
                        <CiCalendarDate className='icon' />
                        Date
                    </div>
                )
            case "member-picker":
                return (
                    <div onClick={() => addColumn('member-picker')}>
                        <HiOutlineUserCircle className='icon' />
                        Person
                    </div>
                )
            case "file-picker":
                return (
                    <div onClick={() => addColumn('file-picker')}>
                        <ImFilesEmpty />
                        Files
                    </div>
                )
            case "number-picker":
                return (
                    <div onClick={() => addColumn('number-picker')}>
                        <CiCalculator2 />
                        Numbers
                    </div>
                )
            case "updated-picker":
                return (
                    <div onClick={() => addColumn('updated-picker')}>
                        <RxCountdownTimer />
                        Updated
                    </div>
                )
            case "checkbox-picker":
                return (
                    <div onClick={() => addColumn('checkbox-picker')}>
                        <BsCheckSquare />
                        Checkbox
                    </div>
                )
            default:
                break;
        }
    }

    if (!columns.length) return <div></div>
    return <ul className="add-column-modal">
        {columns.map((column, idx) => <li key={idx}> {getIconAction(column)} </li>)}
    </ul >
}