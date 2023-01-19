
export const TaskService = {
    getEmptyTask,
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
