import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import { utilService } from './util.service.js'

const BASE_URL = 'board/'

export const boardService = {
    query,
    getById,
    save,
    remove,
    getDefaultFilterBoard,
    getDefaultFilterBoards,
    getFilterFromSearchParams,
    getEmptyGroup,
    getEmptyTask,
    getEmptyComment,
    getEmptyActivity,
    getEmptyBoard
}

function query(filter = getDefaultFilterBoards()) {
    const queryParams = `?title=${filter.title}`
    return httpService.get(BASE_URL + queryParams)
}

function getById(boardId, filterBy = getDefaultFilterBoard()) {
    const queryParams = `?title=${filterBy.title}`
    return httpService.get(BASE_URL + boardId + queryParams)
}

function remove(boardId) {
    return httpService.delete(BASE_URL + boardId)
}

function save(board) {
    if (board._id) return httpService.put(BASE_URL + board._id, board)
    return httpService.post(BASE_URL, board)
}

function getDefaultFilterBoards() {
    return {
        title: '',
        isStarred: null
    }
}

function getDefaultFilterBoard() {
    return { title: '' }
}

function getFilterFromSearchParams(searchParams) {
    const emptyFilter = getDefaultFilterBoard()
    const filterBy = {}
    for (const field in emptyFilter) {
        filterBy[field] = searchParams.get(field) || ''
    }
    return filterBy
}

function getEmptyGroup() {
    return {
        "title": 'New Group',
        "archivedAt": Date.now(),
        "tasks": [],
        "color": '#ffcb00',
        "id": utilService.makeId()
    }
}

function getEmptyTask() {
    return {
        "title": "",
        "status": "",
        "priority": "",
        "memberIds": [],
        "dueDate": '',
        "comments": []
    }
}

function getEmptyComment() {
    return {
        "archivedAt": Date.now(),
        "byMember": {
            "_id": "m101",
            "fullname": "Tal Tarablus",
            "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673788222/cld-sample.jpg"
        }, "txt": "",
        "style": {
            "textDecoration": "none",
            "fontWeight": "normal",
            "fontStyle": "normal",
            "textAlign": "Left"
        }
    }
}

function getEmptyActivity() {
    return {
        "action": "status",
        "createdAt": Date.now(),
        "createdBy": userService.getLoggedinUser() || {
            "_id": "u101",
            "fullname": "Abi Abambi",
            "imgUrl": "https://res.cloudinary.com/du63kkxhl/image/upload/v1673788222/cld-sample.jpg"
        },
        "task": {
            "id": "c101",
            "title": "Replace Logo"
        },
        "from": {}, 
        "to": {}
    }
}

function getEmptyBoard() {
    return {
        "title": 'New Board',
        "archivedAt": Date.now(),
        "isStarred": false,
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
                "id": "l103",
                "title": "Stuck",
                "color": "#e2445c"
            },
            {
                "id": "l104",
                "title": "Low",
                "color": "#ffcb00"
            },
            {
                "id": "l105",
                "title": "Medium",
                "color": "#a25ddc"
            },
            {
                "id": "l106",
                "title": "High",
                "color": "#e2445c"
            },
            {
                "id": "l107",
                "title": "",
                "color": "#c4c4c4"
            },
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
        "cmpsOrder": ["status-picker", "member-picker", "date-picker", 'priority-picker']
    }
}


