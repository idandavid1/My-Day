import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import { boardService } from "../../services/board.service"

export function DueDate({ info, onUpdate }) {

    const activity = boardService.getEmptyActivity()
    activity.action = 'date'
    activity.from = info.dueDate
    activity.task = {id: info.id, title: info.title}
    function onChange(data) {
        activity.to = data.getTime()
        onUpdate('dueDate', data.getTime(), activity)
    }
    return (
        <section className="picker date-picker ">
            <DatePicker
                popperClassName="date-picker-input"
                dateFormat="MMM d"
                selected={info.dueDate}
                onChange={onChange}/>
        </section>
    )
}