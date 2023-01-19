import { useEffect, useState } from "react"
import DatePicker from "react-datepicker"
import { utilService } from "../../services/util.service"
import "react-datepicker/dist/react-datepicker.css"
export function DueDate({ info, onUpdate }) {
    const [startDate, setStartDate] = useState(info.dueDate || new Date())

    useEffect(() => {
        onUpdate(startDate)
    }, [startDate])
    // if (!info.dueDate) return <div className="picker"></div>

    const date = new Date(info.dueDate)
    const day = date.getDate()
    const month = utilService.getMonthName(date)


    return (
        <section className="picker date-picker ">
            <DatePicker
                popperClassName="date-picker-input"
                dateFormat="MMM d"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
        </section>
    )
}