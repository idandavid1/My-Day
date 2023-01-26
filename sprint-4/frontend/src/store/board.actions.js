import { boardService } from '../services/board.service.js'

import { store } from './store.js'
import { SET_FILTER_BOARD, SET_BOARDS, SET_BOARD, REMOVE_BOARD, ADD_BOARD, UPDATE_BOARD, SET_FILTER, SET_MODAL, REMOVE_GROUP } from "./board.reducer.js"
import { utilService } from '../services/util.service.js'
import { socketService, SOCKET_EMIT_SEND_UPDATE_BOARD } from '../services/socket.service.js'

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
        const board = await boardService.getById(boardId)
        const filteredBoard = boardService.getFilteredBoard(board, filterBy)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
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

export async function updatePickerCmpsOrder(filteredBoard, cmpsOrders) {
    try {
        const { board } = store.getState().boardModule
        board.cmpsOrder = cmpsOrders
        filteredBoard.cmpsOrder = cmpsOrders
        await saveBoard(board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function addGroup(filteredBoard) {
    try {
        const { board } = store.getState().boardModule
        const group = boardService.getEmptyGroup()
        group.id = utilService.makeId()
        filteredBoard.groups.unshift(group)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function duplicateGroup(filteredBoard, group) {
    try {
        const { board } = store.getState().boardModule
        const duplicatedGroup = structuredClone(group)
        duplicatedGroup.id = utilService.makeId()
        const idx = board.groups.indexOf(group)
        board.groups.splice(idx + 1, 0, duplicatedGroup)
        await boardService.save(board)
        filteredBoard.groups.splice(idx + 1, 0, duplicatedGroup)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function duplicateTask(filteredBoard, group, task) {
    try {
        const { board } = store.getState().boardModule
        const duplicatedTask = structuredClone(task)
        const idx = group.tasks.indexOf(task)
        duplicatedTask.id = utilService.makeId()
        duplicatedTask.title += ' (copy)'
        group.tasks.splice(idx + 1, 0, duplicatedTask)
        board.groups = board.groups.map(currGroup => currGroup.id === group.id ? group : currGroup)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function addTask(task, group, filteredBoard, activity) {
    try {
        const { board } = store.getState().boardModule
        task.id = utilService.makeId()
        group.tasks.push(task)
        board.groups = board.groups.map(currGroup => (currGroup.id === group.id) ? group : currGroup)
        activity.task = { id: task.id, title: task.title }
        addActivity(filteredBoard, activity)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function addTaskOnFirstGroup(filteredBoard) {

    try {
        const { board } = store.getState().boardModule
        if (!filteredBoard.groups.length) await addGroup(filteredBoard)
        const taskToAdd = boardService.getEmptyTask()
        taskToAdd.title = 'New Task'
        board.groups[0].tasks.push(taskToAdd)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export function toggleModal(isOpenModal) {
    store.dispatch({ type: SET_MODAL, isOpen: !isOpenModal })
}

export async function updateGroups(groupId, filteredBoard) {
    try {
        const { board } = store.getState().boardModule
        const groupsToSave = board.groups.filter(group => group.id !== groupId)
        board.groups = groupsToSave
        filteredBoard.groups = groupsToSave
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function updateGroupAction(filteredBoard, saveGroup) {
    try {
        const board = await boardService.updateGroup(filteredBoard._id, saveGroup)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function updateTaskAction(filteredBoard, groupId, saveTask, activity) {
    try {
        if (activity) {
            addActivity(filteredBoard, activity)
        }
        const board = await boardService.updateTask(filteredBoard._id, groupId, saveTask)
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, board)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function toggleStarred(filteredBoard, isStarred) {
    try {
        const { board } = store.getState().boardModule
        board.isStarred = !board.isStarred
        await boardService.save(board)
        const filter = boardService.getDefaultFilterBoards()
        filter.isStarred = isStarred
        let boards = await boardService.query(filter)
        filteredBoard.isStarred = board.isStarred
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        throw err
    }
}

export async function addActivity(filteredBoard, activity) {
    try {
        const { board } = store.getState().boardModule
        if (board.activities.length >= 30) {
            filteredBoard.activities.splice(19, 10)
            board.activities.splice(19, 10)
        }
        board.activities.unshift(activity)
        await boardService.save(board)
        filteredBoard.activities.unshift(activity)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

