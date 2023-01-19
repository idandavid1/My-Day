import { boardService } from '../services/board.service.js'
import { groupService } from '../services/group.service.js'
import { TaskService } from '../services/task.service.js'

import { store } from './store.js'
import { SET_BOARDS, SET_BOARD, REMOVE_BOARD, ADD_BOARD, UPDATE_BOARD, SET_FILTER } from "./board.reducer.js"

export async function loadBoards() {
    try {
        const boards = await boardService.query()
        store.dispatch({ type: SET_BOARDS, boards })
    } catch (err) {
        console.log('Had issues loading', err)
        throw err
    }
}

export async function loadBoard(boardId) {
    try {
        const board = await boardService.getById(boardId)
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

export function setFilter(filter) {
    store.dispatch({ type: SET_FILTER, filter })
}

export async function addGroup(board) {
    try {
        const group = groupService.getEmptyGroup()
        board.groups.push(group)
        const boardToSave = await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: boardToSave})
    } catch (err) {
        console.error('cant add group:', err)
        throw err
    }
}

export async function addTask(task , group , board){
    try{
        group.tasks.push(task)
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.error('cant add task:', err)
    }
}

export async function updateAction(board) {
    try {
        await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board })
    } catch (err) {
        console.error('cant add task:', err)
    }
}