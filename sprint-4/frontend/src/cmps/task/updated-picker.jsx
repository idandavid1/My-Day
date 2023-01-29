import { utilService } from "../../services/util.service"

const guest = require('../../assets/img/guest.png')

export function UpdatedPicker({ info, onUpdate }) {
    return (
        <section className="updated-picker picker">
            <img src={info.updatedBy?.imgUrl || guest} alt="" />
            <span className="updated-date">
                {utilService.calculateTime(info.updatedBy.date)}
            </span>
        </section>
    )
}