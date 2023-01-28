import { AiOutlineFileAdd } from 'react-icons/ai'

export function FilePicker({ info, onUpdate }) {

    return (
        <section className="file-picker picker">
            <label htmlFor="file-upload">
                <AiOutlineFileAdd className="icon" />
            </label>
            <input type="file" id="file-upload" />
        </section>
    )
}