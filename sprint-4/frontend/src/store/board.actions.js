import { boardService } from '../services/board.service.js'
import { groupService } from '../services/group.service.js'
import { TaskService } from '../services/task.service.js'

import { store } from './store.js'
import { SET_BOARDS, SET_BOARD, REMOVE_BOARD, ADD_BOARD, UPDATE_BOARD, SET_FILTER, SET_MODAL, REMOVE_GROUP } from "./board.reducer.js"

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

export async function addGroup(board) {
    try {
        const group = groupService.getEmptyGroup()
        board.groups.unshift(group)
        const boardToSave = await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: boardToSave })
    } catch (err) {
        console.error('cant add group:', err)
        throw err
    }
}

export async function addTask(task, group, board) {
    try {
        group.tasks.push(task)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.error('cant add task:', err)
    }
}

export async function addTaskOnFirstGroup(board) {
    if(!board.groups.length) addGroup(board)
    try {
        const taskToAdd = TaskService.getEmptyTask()
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
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilter())
        board.groups = board.groups.map(group => (group.id === saveGroup.id) ? saveGroup : group)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        console.error('cant save group:', err)
    }
    
}

export async function updateTaskAction(currBoard, groupId, saveTask) {
    try {
        const board = await boardService.getById(currBoard._id, boardService.getDefaultFilter())
        const group = board.groups.find(group => group.id === groupId)
        group.tasks = group.tasks.map(task => (task.id === saveTask.id) ? saveTask : task)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: currBoard })
    } catch (err) {
        console.error('cant add task:', err)
    }
}