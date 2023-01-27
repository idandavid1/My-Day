import { useSelector } from "react-redux";
import { boardService } from "../../services/board.service";
import { loadBoard } from "../../store/board.actions";

export function MemberFilterModal({ setIsModalOpen }) {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)
    const filter = useSelector(storeState => storeState.boardModule.filter)
    const [filterBy, setFilterBy] = useState(filter)
    
    async function onFilterBoard(memberId) {
        try {
            const filter = boardService.getDefaultFilterBoard()
            filter.memberId = memberId
            loadBoard(board._id, filter)
            // setIsModalOpen(false)
        } catch (err) {
            console.log('err:', err)
        }
    }

    return (
        <section className="create-board-modal">
            {console.log('memberId:', memberId)}
            <h2>Quick person filter</h2>
            <h3>Filter items and subitems by person</h3>
            <ul>
                {
                    board.members.map(member => {
                        return <li>
                            <img onClick={() => onFilterBoard(member._id)} src={member.imgUrl} alt="" />
                        </li>
                    })
                }
            </ul>
    </section>
    )

}