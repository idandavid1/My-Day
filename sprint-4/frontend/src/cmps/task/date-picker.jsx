import { useState } from "react"
import DatePicker from "react-datepicker"
import { utilService } from "../../services/util.service"

import "react-datepicker/dist/react-datepicker.css"
export function DueDate({ info, onUpdate }) {
    // const [startDate, setStartDate] = useState()
    return (
        <section className="picker date-picker ">
            <DatePicker
                popperClassName="date-picker-input"
                dateFormat="MMM d"
                selected={info.dueDate}
                onChange={(data) => onUpdate('dueDate', data.getTime() )}
            />
        </section>
    )
}