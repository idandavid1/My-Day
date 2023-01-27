import { ImFilesEmpty } from 'react-icons/im'
import { CiCalculator2 } from 'react-icons/ci'
import { RxCountdownTimer } from "react-icons/rx"
import { BsCheckSquare } from "react-icons/bs"

export function AddColumnModal({onAddColumn}) {


    return <section className="add-column-modal">
        <span onClick={() => onAddColumn('file-picker')} > <ImFilesEmpty /> Files</span>
        <span onClick={() => onAddColumn('number-picker')}><CiCalculator2 />Numbers</span>
        <span onClick={() => onAddColumn('updated-picker')}><RxCountdownTimer /> Updated</span>
        <span onClick={() => onAddColumn('checkbox-picker')}><BsCheckSquare />Checkbox</span>
    </section>
}
// VscAccount