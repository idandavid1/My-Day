import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'

const STORAGE_KEY = 'boardDB'

_createBoards()

export const boardService = {
    query,
    getById,
    save,
    remove,
    getEmptyBoard,
    getDefaultFilter,
    getDefaultFilterBoard,
    getFilterFromSearchParams
}


async function query(filterBy = getDefaultFilterBoard()) {
    let boards = await storageService.query(STORAGE_KEY)
    if (filterBy.title) {
        const regex = new RegExp(filterBy.title, 'i')
        boards = boards.filter(board => regex.test(board.title))
    }
    return boards
}

async function getById(boardId, filterBy = getDefaultFilter()) {
    try {
        let board = await storageService.get(STORAGE_KEY, boardId)
        console.log('filterBy:', filterBy)
        // if(filterBy.title){
        //     const regex = new RegExp(filterBy.title, 'i')
        //     const groups = board.groups.filter(group => regex.test(group.title))
        //     groups.forEach(group => {
        //         console.log('group.tasks:', group.tasks)
        //         group.tasks = group.tasks.filter(task => regex.test(task.title))
        //     })

        //     board.groups = groups
        // }
        return board
    } catch (err) {
        throw err
    }
}

function remove(boardId) {
    return storageService.remove(STORAGE_KEY, boardId)
}

function save(board) {
    if (board._id) return storageService.put(STORAGE_KEY, board)
    return storageService.post(STORAGE_KEY, board)
}

function getDefaultFilter() {
    return { title: '' }
}

function getDefaultFilterBoard() {
    return { title: '' }
}

function getFilterFromSearchParams(searchParams) {
    const emptyFilter = getDefaultFilter()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}


function getEmptyBoard() {
    return {
        "title": 'New Board',
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
        "members": [
            {
                "_id": "m101",
                "fullname": "Tal Tarablus",
                "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673788222/cld-sample.jpg"
            },
            {
                "_id": "m102",
                "fullname": "Idan David",
                "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673820094/%D7%A2%D7%99%D7%93%D7%9F_jranbo.jpg"
            }],
        "groups": [],
        "activities": [],
        "cmpsOrder": ["status-picker", "member-picker", "date-picker"]
    }
}

function _createBoards() {
    let boards = utilService.loadFromStorage(STORAGE_KEY)
    if (!boards ) {
        boards = []
        boards.push(
            {
                "_id": "b101",
                "title": "Robot dev proj",
                "archivedAt": 1589983468418,
                "createdBy": {
                    "_id": "m102",
                    "fullname": "Idan David",
                    "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673820094/%D7%A2%D7%99%D7%93%D7%9F_jranbo.jpg"
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
                        "title": "Low",
                        "color": "#ffcb00"
                    },
                    {
                        "id": "l101",
                        "title": "Medium",
                        "color": "#a25ddc"
                    },
                    {
                        "id": "l102",
                        "title": "High",
                        "color": "#e2445c"
                    },
                ],
                "members": [
                    {
                        "id": "m101",
                        "fullname": "Tal Tarablus",
                        "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673788222/cld-sample.jpg"
                    },
                    {
                        "id": "m102",
                        "fullname": "Idan David",
                        "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673820094/%D7%A2%D7%99%D7%93%D7%9F_jranbo.jpg"
                    },
                    {
                        "id": "m103",
                        "fullname": "Ofek Tarablus",
                        "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1674069458/image_exxnux.png"
                    },
                    {
                        "id": "m104",
                        "fullname": "Ofer Tarablus",
                        "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1674069496/me_dpbzfs.jpg"
                    }
                ],
                "groups": [{
                    "id": "g101",
                    "title": "Group 1",
                    "archivedAt": 1589983468418,
                    "tasks": [
                        {
                            "id": "c101",
                            "title": "Replace logo",
                            "status": "Stuck",
                            "priority": "Medium",
                            "memberIds": ["m101", "m102", "m103"],
                            "dueDate": 1615621
                        },
                        {
                            "id": "c102",
                            "title": "Add Samples",
                            "status": "Done",
                            "priority": "Low",
                            "memberIds": ["m101"],
                            "dueDate": 16156211111
                        },
                    ],
                    "color": '#66ccff'
                },
                {
                    "id": "g102",
                    "title": "Group 2",
                    "tasks": [
                        {
                            "id": "c103",
                            "title": "Help me",
                            "status": "Done",
                            "priority": "High",
                            "memberIds": ["m101", "m102", "m103"],
                            "dueDate": 16156215211,
                        },
                        {
                            "id": "c104",
                            "title": "Help me",
                            "status": "Done",
                            "priority": "High",
                            "memberIds": ["m103"],
                            "dueDate": 16156215211
                        },
                        {
                            "id": "c105",
                            "title": "Help me",
                            "status": "Progress",
                            "priority": "Low",
                            "memberIds": ["m101", "m103"],
                            "dueDate": 16156215211
                        }
                    ],
                    "color": '#a25ddc'
                }],
                "activities": [
                    {
                        "id": "a101",
                        "txt": "Changed Color",
                        "createdAt": 154514,
                        "byMember": {
                            "_id": "m101",
                            "fullname": "Tal Tarablus",
                            "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673788222/cld-sample.jpg"
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
