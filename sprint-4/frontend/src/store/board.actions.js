import { boardService } from '../services/board.service.js'

import { store } from './store.js'
import { SET_BOARDS, SET_BOARD, REMOVE_BOARD, ADD_BOARD, UPDATE_BOARD, SET_FILTER, SET_MODAL, REMOVE_GROUP } from "./board.reducer.js"
import { utilService } from '../services/util.service.js'

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log('Had issues loading', err)
        throw err
    }
}

export async function loadBoard(boardId, filterBy) {
    try {
        const board = await boardService.getById(boardId, filterBy)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.log('Had issues loading', err)
        throw err
    }
}

export async function removeBoard(boardId) {
    try {
        await boardService.remove(boardId)
        store.dispatch({ type: REMOVE_BOARD, boardId })
    } catch (err) {
        console.log('cant remove', err)
        throw err
    }
}

export async function saveBoard(board) {
    const type = (board._id) ? UPDATE_BOARD : ADD_BOARD
    try {
        const newBoard = await boardService.save(board)
        store.dispatch({ type, board: newBoard })
        return board
    } catch (err) {
        console.error('cant save board:', err)
        throw err
    }
}

export async function updatePickerCmpsOrder(currBoard, cmpsOrders) {
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilterBoard())
        board.cmpsOrder = cmpsOrders
        currBoard.cmpsOrder = cmpsOrders
        await saveBoard(board)
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        console.log(err)
    }
}

export async function addGroup(board) {
    try {
        const group = boardService.getEmptyGroup()
        board.groups.unshift(group)
        const boardToSave = await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: boardToSave })
    } catch (err) {
        console.error('cant add group:', err)
        throw err
    }
}

export async function duplicateGroup(currBoard, group) {
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilterBoard())
        const duplicatedGroup = structuredClone(group)
        duplicatedGroup.id = utilService.makeId()
        const idx = board.groups.indexOf(group)
        board.groups.splice(idx + 1, 0, duplicatedGroup)
        await boardService.save(board)
        currBoard.groups.splice(idx + 1, 0, duplicatedGroup)
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        throw err
    }
}

export async function duplicateTask(currBoard, group, task) {
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilterBoard())
        const duplicatedTask = structuredClone(task)
        const idx = group.tasks.indexOf(task)
        duplicatedTask.id = utilService.makeId()
        duplicatedTask.title += ' (copy)'
        group.tasks.splice(idx + 1, 0, duplicatedTask)
        board.groups = board.groups.map(currGroup => currGroup.id === group.id ? group : currGroup)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        throw err
    }
}

export async function addTask(task, group, currBoard, activity) {
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilterBoard())
        task.id = utilService.makeId()
        group.tasks.push(task)
        board.groups = board.groups.map(currGroup => (currGroup.id === group.id) ? group : currGroup)
        activity.task = {id: task.id, title: task.title}
        board.activities.push(activity) 
        await boardService.save(board)
        currBoard.activities.push(activity) 
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        console.error('cant add task:', err)
    }
}

export async function addTaskOnFirstGroup(board) {
    if (!board.groups.length) addGroup(board)
    try {
        const taskToAdd = boardService.getEmptyTask()
        taskToAdd.title = 'New Task'
        board.groups[0].tasks.push(taskToAdd)
        const boardToSave = await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: boardToSave })
    } catch (err) {
        console.log('cant add task:', err)
    }
}

export function toggleModal(isOpenModal) {
    store.dispatch({ type: SET_MODAL, isOpen: !isOpenModal })
}

export async function updateGroups(groups, board) {
    board.groups = groups
    const boardToSave = await boardService.save(board)
    store.dispatch({ type: UPDATE_BOARD, board: boardToSave })
}

export async function updateGroupAction(currBoard, saveGroup) {
    console.log(saveGroup)
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilterBoard())
        board.groups = board.groups.map(group => (group.id === saveGroup.id) ? saveGroup : group)
        currBoard.groups = currBoard.groups.map(group => (group.id === saveGroup.id) ? saveGroup : group)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        console.error('cant save group:', err)
    }

}

export async function updateTaskAction(currBoard, groupId, saveTask, activity) {
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilterBoard())
        const group = board.groups.find(group => group.id === groupId)
        group.tasks = group.tasks.map(task => (task.id === saveTask.id) ? saveTask : task)
        if(activity) {
            board.activities.unshift(activity)
            currBoard.activities.unshift(activity)
        }
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        console.error('cant add task:', err)
    }
}

export async function toggleStarred(currBoard) {
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilterBoard())
        board.isStarred = !board.isStarred
        await boardService.save(board)
        const boards = await boardService.query(boardService.getDefaultFilterBoards())
        currBoard.isStarred = board.isStarred
        store.dispatch({ type: SET_BOARD, board: currBoard })
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        throw err
    }
}

export async function addActivity(currBoard, activity) {
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilterBoard())
        board.activities.unshift(activity)
        await boardService.save(board)
        currBoard.activities.unshift(activity)
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        throw err
    }
}

