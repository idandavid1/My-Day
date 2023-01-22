
export const TaskService = {
    getEmptyTask,
    getById
}

function getById(board, groupId, taskId) {
    const group = board.groups.find(group => group.id === groupId)
    return group.tasks.find(task => task.id === taskId)
}

function getEmptyTask() {
    return {
        "title": "",
        "status": "", 
        "priority": "", 
        "memberIds": [],
        "dueDate": ''
    }
}
