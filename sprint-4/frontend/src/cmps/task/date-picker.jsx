
import { utilService } from "../../services/util.service"


export function DatePicker({ info, onUpdate }) {
    if (!info.dueDate) return <div className="picker"></div>

    const date = new Date(info.dueDate)
    const day = date.getDate()
    const month = utilService.getMonthName(date)

    return (
        <section className="date-picker picker">
            {month} {day}
        </section>
    )
}