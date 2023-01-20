import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
export function DueDate({ info, onUpdate }) {
    return (
        <section className="picker date-picker ">
            <DatePicker
                popperClassName="date-picker-input"
                dateFormat="MMM d"
                selected={info.dueDate}
                onChange={(data) => onUpdate('dueDate', data.getTime())}
            />
            {/* <input type="date" /> */}
        </section>
    )
}