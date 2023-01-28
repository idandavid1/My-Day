import { IoTimeOutline } from 'react-icons/io5'





export function LastViewed({ member }) {

    const guest = require('../assets/img/guest.png')
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