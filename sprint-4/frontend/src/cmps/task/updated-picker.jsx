import { utilService } from "../../services/util.service"

import { BsPersonCircle } from "react-icons/bs"

export function UpdatedPicker({ info, onUpdate }) {
    return (
        <section className="updated-picker picker">
            <div className="updated-picker-content flex align-center space-between">
                {info.updatedBy?.imgUrl && <img src={info.updatedBy?.imgUrl} alt="" />}
                {!info.updatedBy?.imgUrl && <BsPersonCircle className="icon-person" />}
                <span className="updated-date">
                    {utilService.calculateTime(info.updatedBy.date)}
                </span>
            </div>
        </section>
    )
}