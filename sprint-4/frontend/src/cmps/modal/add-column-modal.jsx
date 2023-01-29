import { useEffect, useState } from 'react'

import { ImFilesEmpty } from 'react-icons/im'
import { CiCalculator2 } from 'react-icons/ci'
import { RxCountdownTimer } from "react-icons/rx"
import { BsCheckSquare } from "react-icons/bs"
import { CiCalendarDate }  from 'react-icons/ci'

const statusImg = require('../../assets/img/status.png')

export function AddColumnModal({ addColumn, board }) {
    const [columns, setColumns] = useState([])

    useEffect(() => {
        loadColumns()
    }, [])

    function loadColumns() {
        const columns = board.cmpsOption.filter(cmpOption => {
            return !board.cmpsOrder.includes(cmpOption)
        })

        setColumns(columns)
    }
    function getIconAction(column) {
        switch (column) {
            case 'status-picker':
                return (
                    <span onClick={() => addColumn('status-picker')}>
                        <img src={statusImg} alt="" />
                        Status
                    </span>
                )
            case 'priority-picker':
                return (
                        <span onClick={() => addColumn('priority-picker')}>
                            <img src={statusImg} alt="" />
                            Priority
                        </span>
                    )
            case 'date-picker': 
                return (
                    <span onClick={() => addColumn('date-picker')}>
                        <CiCalendarDate className='icon'/>
                        Date
                    </span>
                )
            case "member-picker":
                return (
                    <span onClick={() => addColumn('member-picker')}>
                        <CiCalendarDate className='icon'/>
                        Person
                    </span>
                )
            case "file-picker":
                return (
                    <span onClick={() => addColumn('file-picker')}>
                        <ImFilesEmpty />
                        Files
                    </span>
                )
            case "number-picker":
                return (
                    <span onClick={() => addColumn('number-picker')}>
                        <CiCalculator2 />
                        Numbers
                    </span>
                )
            case "updated-picker":
                return (
                    <span onClick={() => addColumn('updated-picker')}>
                        <RxCountdownTimer />
                        Updated
                    </span>
                )
            case "checkbox-picker":
                return (
                    <span onClick={() => addColumn('checkbox-picker')}>
                        <BsCheckSquare />
                        Checkbox
                    </span>
                )
            default:
                break;
        }
    }

    if(!columns.length) return <div></div>
    return <section className="add-column-modal">
        {columns.map(column => getIconAction(column))}
    </section>
}