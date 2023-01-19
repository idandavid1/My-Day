import { boardService } from '../services/board.service.js'
import { groupService } from '../services/group.service.js'
import { store } from './store.js'
import { SET_BOARDS, SET_BOARD, REMOVE_BOARD, ADD_BOARD, UPDATE_BOARD, SET_FILTER, ADD_GROUP } from "./board.reducer.js"

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
        await boardService.save(board)
        store.dispatch({ type, board })
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
        const groupToSave = await groupService.save(group)
        board.groups.push(groupToSave._id)
        const boardToSave = await boardService.save(board)
        store.dispatch({ type: SET_BOARD, board: boardToSave})
    } catch (err) {
        console.error('cant add group:', err)
        throw err
    }
}
