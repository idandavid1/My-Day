import { useSelector } from "react-redux"


export function BoardModal() {
    const isOpenModal = useSelector(storeState => storeState.boardModule.isBoardModalOpen)

    return <section className="board-modal">
        hello from board modal
    </section>
}