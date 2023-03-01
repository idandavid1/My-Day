import { boardService } from '../services/board.service.js'

import { store } from './store.js'
import { SET_FILTER_BOARD, SET_BOARDS, SET_BOARD, REMOVE_BOARD, ADD_BOARD, UPDATE_BOARD, SET_FILTER, SET_MODAL, REMOVE_GROUP, SET_DYNAMIC_MODAL } from "./board.reducer.js"
import { utilService } from '../services/util.service.js'
import { socketService, SOCKET_EMIT_SEND_UPDATE_BOARD } from '../services/socket.service.js'

export async function loadBoards(filterBy) {
    try {
        const boards = await boardService.query(filterBy)
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        throw err
    }
}

export async function loadSocketBoard(filteredBoard, board) {
    try {
        // const { filter } = store.getState().boardModule
        // if(!filteredBoard) {
        //     filteredBoard = boardService.getFilteredBoard(board, filter)
        // } 
        store.dispatch({ type: SET_BOARD, board })
        if (!filteredBoard) store.dispatch({ type: SET_FILTER_BOARD, filteredBoard: board })
        else store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
    } catch (err) {
        throw err
    }
}

export async function updateOptimisticBoard(newBoard, prevBoard) {
    console.log('newBoard', newBoard, 'prevBoard', prevBoard)
    try {
        store.dispatch({ type: SET_BOARD, board: newBoard })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard: newBoard })
        saveBoard(newBoard)
    } catch (err) {
        store.dispatch({ type: SET_BOARD, board: prevBoard })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard: prevBoard })
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
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard: null, board: newBoard })
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
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
    } catch (err) {
        throw err
    }
}

export async function addGroup(filteredBoard) {
    try {
        const { board } = store.getState().boardModule
        const group = boardService.getEmptyGroup()
        group.id = utilService.makeId()
        board.groups.unshift(group)
        await boardService.save(board)
        // filteredBoard.groups.unshift(group)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
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
        // filteredBoard.groups.splice(idx + 1, 0, duplicatedGroup)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
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
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
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
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
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
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
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
        await boardService.save(board)
        filteredBoard.groups = groupsToSave
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
    } catch (err) {
        throw err
    }
}

export async function updateGroupAction(filteredBoard, saveGroup) {
    try {
        const { board } = store.getState().boardModule
        const groupsToSave = board.groups.map(group => group.id === saveGroup.id ? saveGroup : group)
        await boardService.updateGroup(filteredBoard._id, saveGroup)
        filteredBoard.groups = groupsToSave
        board.groups = groupsToSave
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
    } catch (err) {
        throw err
    }
}

export async function updateTaskAction(filteredBoard, groupId, saveTask, activity) {
    try {
        if (activity) {
            await addActivity(filteredBoard, activity)
        }
        const board = await boardService.updateTask(filteredBoard._id, groupId, saveTask)
        _updateTask(filteredBoard, groupId, saveTask)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
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
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
    } catch (err) {
        throw err
    }
}

export async function addActivity(filteredBoard, activity) {
    try {
        const { board } = store.getState().boardModule
        if (board.activities.length >= 30) {
            board.activities.pop()
            filteredBoard.activities.pop()
        }
        board.activities.unshift(activity)
        await boardService.save(board)
        filteredBoard.activities.unshift(activity)
        store.dispatch({ type: SET_BOARD, board })
        store.dispatch({ type: SET_FILTER_BOARD, filteredBoard })
        socketService.emit(SOCKET_EMIT_SEND_UPDATE_BOARD, { filteredBoard, board })
    } catch (err) {
        throw err
    }
}

export function setFilter(filter) {
    store.dispatch({ type: SET_FILTER, filter })
}

export function setDynamicModalObj(dynamicModalObj) {
    store.dispatch({ type: SET_DYNAMIC_MODAL, dynamicModalObj })
}

// Drag and drop
export async function handleOnDragEnd(result , board) {
    let newBoard = structuredClone(board);
    if (!result.destination) {
        return;
    }
    // Reordering groups
    if (result.type === 'group') {
        const updatedGroups = [...board.groups]
        const [draggedItem] = updatedGroups.splice(result.source.index, 1)
        updatedGroups.splice(result.destination.index, 0, draggedItem)
        board.groups = updatedGroups
        saveBoard(board)
    }
    // Reordering tasks
    if (result.type === 'task') {
        const startGroup = newBoard.groups.find(group => group.id === result.source.droppableId)
        const finishGroup = newBoard.groups.find(group => group.id === result.destination.droppableId)
        // Reordering tasks between groups
        if (startGroup !== finishGroup) {
            const [removedTask] = startGroup.tasks.splice(result.source.index, 1)
            finishGroup.tasks.splice(result.destination.index, 0, removedTask)
            updateOptimisticBoard(newBoard, board)
            return
        }
        const updatedTasks = [...startGroup.tasks]
        const [draggedItem] = updatedTasks.splice(result.source.index, 1)
        updatedTasks.splice(result.destination.index, 0, draggedItem)
        startGroup.tasks = updatedTasks
        updateOptimisticBoard(newBoard, board)
    }
}

// private functions
function _updateTask(filteredBoard, groupId, saveTask) {
    const group = filteredBoard.groups.find(currGroup => currGroup.id === groupId)
    group.tasks = group.tasks.map(task => task.id === saveTask.id ? saveTask : task)
}

