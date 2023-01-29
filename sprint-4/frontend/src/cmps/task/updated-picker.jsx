import { BsPersonCircle } from "react-icons/bs"
import { utilService } from "../../services/util.service"

const guest = require('../../assets/img/guest.png')

export function UpdatedPicker({ info, onUpdate }) {
    return (
        <section className="updated-picker picker">
            {info.updatedBy?.imgUrl && <img src={info.updatedBy?.imgUrl} alt="" />}
            {!info.updatedBy?.imgUrl && <BsPersonCircle className="icon-person"/>}
            <span className="updated-date">
                {utilService.calculateTime(info.updatedBy.date)}
            </span>
        </section>
    )
}