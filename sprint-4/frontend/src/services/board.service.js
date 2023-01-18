import { storageService } from './async-storage.service.js' 
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardDb'

_createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getEmptyFilter
}


function query() {
    return storageService.query(STORAGE_KEY)
}

function getById(BoardId) {
    return storageService.get(STORAGE_KEY, BoardId)
}

function remove(BoardId) {
    return storageService.remove(STORAGE_KEY, BoardId)
}

function save(board) {
    if (board._id) return storageService.put(STORAGE_KEY, board)
    return storageService.post(STORAGE_KEY, board)
}

function getEmptyBoard() {
    return {
        "title": '',
        "archivedAt": Date.now(),
        "labels": [
            {
                "id": "l101",
                "title": "Done",
                "color": "#037f4c"
            },
            {
                "id": "l102",
                "title": "Progress",
                "color": "#ffcb00"
            },
            {
                "id": "l103",
                "title": "stack",
                "color": "#e2445c"
            }
        ],
        "members": [],
        "groups": [],
        "activities": [],
        "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
    }
}

function getEmptyFilter() {
    return {

    }
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards) {
        boards = []
        boards.push(
            {
                "_id": "b101",
                "title": "Robot dev proj",
                "archivedAt": 1589983468418,
                "createdBy": {
                    "_id": "u101",
                    "fullname": "Abi Abambi",
                    "imgUrl": "http://some-img"
                },
                "labels": [
                    {
                        "id": "l101",
                        "title": "Done",
                        "color": "#00c875"
                    },
                    {
                        "id": "l102",
                        "title": "Progress",
                        "color": "#fdab3d"
                    },
                    {
                        "id": "l101",
                        "title": "Stuck",
                        "color": "#e2445c"
                    },
                    {
                        "id": "l102",
                        "title": "low",
                        "color": "#ffcb00"
                    },
                    {
                        "id": "l101",
                        "title": "medium",
                        "color": "#a25ddc"
                    },
                    {
                        "id": "l102",
                        "title": "high",
                        "color": "#e2445c"
                    },
                ],
                "members": [
                    {
                        "_id": "u101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "https://www.google.com"
                    },
                    {
                        "_id": "u102",
                        "fullname": "Idan David",
                        "imgUrl": "https://www.google.com"
                    },
                    {
                        "_id": "u103",
                        "fullname": "Ofek Tarablus",
                        "imgUrl": "https://www.google.com"
                    },
                    {
                        "_id": "u104",
                        "fullname": "Ofer Tarablus",
                        "imgUrl": "https://www.google.com"
                    }
                ],
                "groups": [
                    // {
                    //     "id": "g101",
                    //     "title": "Group 1",
                    //     "archivedAt": 1589983468418,
                    //     "tasks": [
                    //         {
                    //             "id": "c101",
                    //             "title": "Replace logo"
                    //         },
                    //         {
                    //             "id": "c102",
                    //             "title": "Add Samples"
                    //         }
                    //     ],
                    // },
                    {
                        "id": "g102",
                        "title": "Group 2",
                        "tasks": [
                            {
                                "id": "c103",
                                "title": "Help me",
                                "status": "Done", // monday
                                "priority": "high", 
                                "description": "description",
                                "memberIds": ["u101", "u102", "u103"],
                                "labelIds": ["l101", "l102"],
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                            },
                            {
                                "id": "c104",
                                "title": "Help me",
                                "status": "Done", // monday
                                "priority": "high", 
                                "description": "description",
                                "memberIds": ["u101", "u102", "u103"],
                                "labelIds": ["l101", "l102"],
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                            },
                            {
                                "id": "c105",
                                "title": "Help me",
                                "status": "Progress", // monday
                                "priority": "low", 
                                "description": "description",
                                "memberIds": ["u101", "u102", "u103"],
                                "labelIds": ["l101", "l102"],
                                "dueDate": 16156215211,
                                "byMember": {
                                    "_id": "u101",
                                    "username": "Tal",
                                    "fullname": "Tal Tarablus",
                                    "imgUrl": "http://res.cloudinary.com/shaishar9/image/upload/v1590850482/j1glw3c9jsoz2py0miol.jpg"
                                },
                            }
                        ],
                    }
                ],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "u101",
                            "fullname": "Abi Abambi",
                            "imgUrl": "http://some-img"
                        },
                        "task": {
                            "id": "c101",
                            "title": "Replace Logo"
                        }
                    }
                ],
            
                "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
            }
        )
        utilService.saveToStorage(STORAGE_KEY, boards)
    }
}






