import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { TbArrowsDiagonal } from "react-icons/tb";

export function TaskMenuModal({taskId ,onRemoveTask}) {








    return <section className="task-menu-modal">
        <div>
            <TbArrowsDiagonal />
            <span>Open</span>
        </div>
        <div>
            <HiOutlineDocumentDuplicate />
            <span>Duplicate</span>
        </div>
        <div onClick={() => onRemoveTask(taskId)}>
            <FiTrash />
            <span>Delete</span>
        </div>
        <div>
            <AiOutlinePlus />
            <span>Create new item below</span>
        </div>
    </section>
}