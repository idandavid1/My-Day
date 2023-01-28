import { useSelector } from "react-redux"
import { utilService } from "../../services/util.service"

const guest = require('../../assets/img/guest.png')

export function UpdatedPicker({ info, onUpdate }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    return (
        <section className="updated-picker picker">
            {(loggedInUser && loggedInUser.imgUrl) && <img src={loggedInUser.imgUrl} alt="" />}
            {(!loggedInUser || !loggedInUser.imgUrl) && <img src={guest} alt="" />}
            <span className="updated-date">
                {utilService.calculateTime(info.updatedAt)}
            </span>
        </section>
    )
}