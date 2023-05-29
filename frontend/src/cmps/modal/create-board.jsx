import { useState } from "react";
import { boardService } from "../../services/board.service";
import { loadBoards, saveBoard } from "../../store/board.actions";
import { AiOutlineClose } from "react-icons/ai";

export function CreateBoard({ setIsModalOpen }) {
    const[board, setBoard] = useState(boardService.getEmptyBoard())

    async function onAddBoard(ev) {
        ev.preventDefault()
        try {
            await saveBoard(board)
            loadBoards()
            setIsModalOpen(false)
        } catch (err) {
            console.log('err:', err)
        }
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        setBoard((prevBoard) => ({ ...prevBoard, [field]: value }))
    }

    return (
        <section className="create-board-modal flex column">
            <div className="close" onClick={() => setIsModalOpen(false)}>
                <AiOutlineClose className="icon" />
            </div>
            <h1>Create board</h1>
            <h3>Board name</h3>
            <form onSubmit={onAddBoard}>
                <input  type="text"
                        name="title"
                        value={board.title}
                        onChange={handleChange}
                        />
                <button></button>
            </form>
    </section>
    )

}