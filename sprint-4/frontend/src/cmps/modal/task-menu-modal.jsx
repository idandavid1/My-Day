import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { TbArrowsDiagonal } from "react-icons/tb";

export function TaskMenuModal({taskId ,onRemoveTask , onDuplicateTask , onOpenModal ,onCreateNewTaskBelow}) {








    return <section className="task-menu-modal">
        <div onClick={onOpenModal}>
            <TbArrowsDiagonal />
            <span>Open</span>
        </div>
        <div onClick={onDuplicateTask}>
            <HiOutlineDocumentDuplicate />
            <span>Duplicate</span>
        </div>
        <div onClick={() => onRemoveTask(taskId)}>
            <FiTrash />
            <span>Delete</span>
        </div>
        <div onClick={onCreateNewTaskBelow}>
            <AiOutlinePlus />
            <span>Create new item below</span>
        </div>
    </section>
}