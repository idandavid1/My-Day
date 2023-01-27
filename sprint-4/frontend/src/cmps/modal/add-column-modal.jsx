import { ImFilesEmpty } from 'react-icons/im'
import { CiCalculator2 } from 'react-icons/ci'
import { RxCountdownTimer } from "react-icons/rx"
import { BsCheckSquare } from "react-icons/bs"

export function AddColumnModal() {



    return <section className="add-column-modal">
        <span> <ImFilesEmpty /> Files</span>
        <span><CiCalculator2 />Numbers</span>
        <span><RxCountdownTimer /> Updated</span>
        <span><BsCheckSquare />Checkbox</span>
    </section>
}
// VscAccount