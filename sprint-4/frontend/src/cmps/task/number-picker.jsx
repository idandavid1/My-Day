import { useEffect } from "react"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import { BsFillPlusCircleFill } from "react-icons/bs"
import { TbNumbers } from "react-icons/tb"
import { boardService } from "../../services/board.service"

export function NumberPicker({ info, onUpdate }) {
    const [number, setNumber] = useState(info.number || '')
    const [isShowInput, setIsShowInput] = useState(false)
    const activity = boardService.getEmptyActivity()

    useEffect(() => {

    }, [number])

    activity.action = 'number'
    activity.from = info.number || ''
    activity.task = { id: info.id, title: info.title }

    function handleNumberChange({ target }) {
        setNumber((target.value))
    }

    function onSave() {
        console.log('number', number)
        activity.to = number
        onUpdate('number', parseInt(number), activity)
    }

    function onClearNumber() {
        setNumber('')
        activity.to = '-'
        onUpdate('number', '', activity)
    }

    return (
        <section className="number-picker picker">
            {(!number && !isShowInput) && <span onClick={() => setIsShowInput(true)} className="add-number-icons"><BsFillPlusCircleFill className="plus-icon" /><TbNumbers /></span>}
            {(number || isShowInput) &&
                <>
                    <input type="number"
                        name="number"
                        value={number}
                        onChange={handleNumberChange}
                        onBlur={onSave} />
                    <span type="button" className="clear-input" onClick={onClearNumber}><AiOutlineClose /></span>
                </>
            }
        </section>
    )
}