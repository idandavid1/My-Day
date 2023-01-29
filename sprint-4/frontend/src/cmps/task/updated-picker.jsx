import { BsPersonCircle } from "react-icons/bs"
import { utilService } from "../../services/util.service"

const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"

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