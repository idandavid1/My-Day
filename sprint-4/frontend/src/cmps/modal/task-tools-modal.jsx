import { HiOutlineDocumentDuplicate } from "react-icons/hi"
import { FiTrash } from "react-icons/fi"
import { IoCloseOutline } from "react-icons/io5"
import { BsArrowRightCircle } from "react-icons/bs"

export function TaskToolsModal() {

    console.log("TaskToolsModal")
    return (

        <section className="task-tool-modal">
            <div className="task-tools">
                <div className="task-count">
                    1
                </div>
                <div className="task-info">
                    Item selected
                </div>
                <div>
                    <HiOutlineDocumentDuplicate />
                    Duplicate
                </div>
                <div>
                    <FiTrash />
                    Delete
                </div>
                <div>
                    <BsArrowRightCircle />
                    Move to
                </div>
                <div>
                    <IoCloseOutline />
                </div>

            </div>
        </section>
    )
}