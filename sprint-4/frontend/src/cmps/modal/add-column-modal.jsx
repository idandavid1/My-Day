import { ImFilesEmpty } from 'react-icons/im'
import { CiCalculator2 } from 'react-icons/ci'
import { RxCountdownTimer } from "react-icons/rx"
import { BsCheckSquare } from "react-icons/bs"

export function AddColumnModal({ addColumn }) {
    return <section className="add-column-modal">
        <span onClick={() => addColumn('file-picker')} > <ImFilesEmpty /> Files</span>
        <span onClick={() => addColumn('number-picker')}><CiCalculator2 />Numbers</span>
        <span onClick={() => addColumn('updated-picker')}><RxCountdownTimer /> Updated</span>
        <span onClick={() => addColumn('checkbox-picker')}><BsCheckSquare />Checkbox</span>
    </section>
}