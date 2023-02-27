import { AiOutlinePlus } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { HiOutlineDocumentDuplicate } from "react-icons/hi";
import { TbArrowsDiagonal } from "react-icons/tb";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { boardService } from "../../services/board.service";
import { utilService } from "../../services/util.service";
import { duplicateTask, setDynamicModalObj, toggleModal, updateGroupAction } from "../../store/board.actions";

export function TaskMenuModal({ dynamicModalObj }) {
    const board = useSelector(storeState => storeState.boardModule.filteredBoard)
    const isOpen = useSelector((storeState) => storeState.boardModule.isBoardModalOpen)
    const navigate = useNavigate()
    function onRemoveTask() {
        try {
            const tasksToSave = dynamicModalObj.group.tasks.filter(task => task.id !== dynamicModalObj.task.id)
            dynamicModalObj.group.tasks = tasksToSave
            updateGroupAction(board, dynamicModalObj.group)
            dynamicModalObj.isOpen = false
            setDynamicModalObj(dynamicModalObj)
        } catch (err) {
            console.log('Failed to remove task', err)
        }
    }

    function onDuplicateTask() {
        try {
            duplicateTask(board, dynamicModalObj.group, dynamicModalObj.task)
            dynamicModalObj.isOpen = false
            setDynamicModalObj(dynamicModalObj)
        } catch (err) {
            console.log(err)
        }
    }

    function onCreateNewTaskBelow() {
        try {
            const newTask = boardService.getEmptyTask()
            newTask.id = utilService.makeId()
            newTask.title = 'New Task'
            const idx = dynamicModalObj.group.tasks.indexOf(dynamicModalObj.task)
            dynamicModalObj.group.tasks.splice(idx + 1, 0, newTask)
            updateGroupAction(board, dynamicModalObj.group)
            dynamicModalObj.isOpen = false
            setDynamicModalObj(dynamicModalObj)
        } catch (err) {
            console.log(err)
        }
    }
    
    function onOpenModal() {
        toggleModal(isOpen)
        navigate(`/board/${board._id}/${dynamicModalObj.group.id}/${dynamicModalObj.task.id}`)
        dynamicModalObj.isOpen = false
        setDynamicModalObj(dynamicModalObj)
    }
    return (
        <section className="task-menu-modal">
            <div onClick={onOpenModal}>
                <TbArrowsDiagonal />
                <span>Open</span>
            </div>
            <div onClick={onDuplicateTask}>
                <HiOutlineDocumentDuplicate />
                <span>Duplicate</span>
            </div>
            <div onClick={() => onRemoveTask()}>
                <FiTrash />
                <span>Delete</span>
            </div>
            <div onClick={onCreateNewTaskBelow}>
                <AiOutlinePlus />
                <span>Create new item below</span>
            </div>
        </section>
    )
}