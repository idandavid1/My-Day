import { IoTimeOutline } from 'react-icons/io5'
const guest = "https://res.cloudinary.com/du63kkxhl/image/upload/v1675013009/guest_f8d60j.png"

export function LastViewed({ member }) {

    return (
        <div className="last-viewed-main">
            <div className="member-info">
                <img src={member.imgUrl || guest} alt="" />
                <span>{member.fullname}</span>
            </div>
            {/* Demo */}
            <div className='last-viewed-member'>
                1d
            </div>
        </div>
    )
}