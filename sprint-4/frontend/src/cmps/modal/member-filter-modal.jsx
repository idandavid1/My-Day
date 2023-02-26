import { useSelector } from "react-redux";

export function MemberFilterModal({ filterBy, setFilterBy }) {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)
    
    function onFilterBoard(memberId) {
        filterBy.memberId = memberId
        setFilterBy({...filterBy})
    }

    return (
        <section className="filter-member-modal flex column">
            <h2>Quick person filter</h2>
            <div className="secondary-title">Filter items and subitems by person</div>
            <ul>
                {
                    board.members.map(member => {
                        return <li className={filterBy.memberId === member._id ? 'active' : ''}>
                            <img onClick={() => onFilterBoard(member._id)} src={member.imgUrl} alt="" />
                        </li>
                    })
                }
            </ul>
    </section>
    )

}