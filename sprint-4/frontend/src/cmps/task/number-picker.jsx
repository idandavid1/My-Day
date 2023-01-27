import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { TbNumbers } from "react-icons/tb"
import { boardService } from "../../services/board.service"

export function NumberPicker({ info, onUpdate }) {
    const [number, setNumber] = useState(info.number || '')
    const activity = boardService.getEmptyActivity()

    activity.action = 'number'
    activity.from = info.number || ''
    activity.task = { id: info.id, title: info.title }

    function handleNumberChange({ target }) {
        setNumber((target.value))
    }

    function onSave() {
        activity.to = number
        onUpdate('number', number, activity)
    }

    return (
        <section className="number-picker picker">
            {!number && <span className="add-number-icons"><BsFillPlusCircleFill className="plus-icon" /><TbNumbers /></span>}
            {number &&
                <>
                    <input type="number"
                        name="number"
                        value={number}
                        onChange={handleNumberChange}
                        onBlur={onSave} />

                    <button type="button" className="clear-input" onClick={() => setNumber('')}><AiOutlineClose /></button>
                </>
            }
        </section>
    )
}