import { storageService } from './async-storage.service.js' 
import { utilService } from './util.service.js'

const STORAGE_KEY = 'taskDB'

_createTasks()

export const TaskService = {
    query,
    getById,
    save,
    remove,
    getEmptyTask
}


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(taskId) {
    return storageService.get(STORAGE_KEY, taskId)
}

function remove(taskId) {
    return storageService.remove(STORAGE_KEY, taskId)
}

function save(task) {
    if (task._id) return storageService.put(STORAGE_KEY, task)
    return storageService.post(STORAGE_KEY, task)
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

function _createTasks() {
    let tasks = utilService.loadFromStorage(STORAGE_KEY)
    if (!tasks) {
        tasks = []
        tasks.push(
            {
                "_id": "c101",
                "title": "Replace logo",
                "status": "Stuck",
                "priority": "Medium", 
                "memberIds": ["m101", "m102", "m103"],
                "dueDate": 1615621
            },
            {
                "_id": "c102",
                "title": "Add Samples",
                "status": "Done",
                "priority": "Low", 
                "memberIds": ["m101"],
                "dueDate": 16156211111
            },
            {
                "_id": "c103",
                "title": "Help me",
                "status": "Done", 
                "priority": "high", 
                "memberIds": ["m101", "m102", "m103"],
                "dueDate": 16156215211,
            },
            {
                "_id": "c104",
                "title": "Help me",
                "status": "Done", 
                "priority": "High", 
                "memberIds": ["m103"],
                "dueDate": 16156215211
            },
            {
                "_id": "c105",
                "title": "Help me",
                "status": "Progress",
                "priority": "Low", 
                "memberIds": ["m101", "m103"],
                "dueDate": 16156215211
            }
        )

        utilService.saveToStorage(STORAGE_KEY, tasks)
    }
}