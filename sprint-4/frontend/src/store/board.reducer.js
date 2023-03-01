import { boardService } from "../services/board.service"

export const SET_BOARDS = 'SET_BOARDS'
export const SET_BOARD = 'SET_BOARD'
export const SET_FILTER_BOARD = 'SET_FILTER_BOARD'
export const REMOVE_BOARD = 'REMOVE_BOARD'
export const ADD_BOARD = 'ADD_BOARD'
export const UPDATE_BOARD = 'UPDATE_BOARD'
export const SET_FILTER = 'SET_FILTER'
export const ADD_GROUP = 'ADD_GROUP'
export const SET_MODAL = 'SET_MODAL'
export const REMOVE_GROUP = 'REMOVE_GROUP'
export const SET_DYNAMIC_MODAL = 'SET_DYNAMIC_MODAL'

const initialState = {
    boards: [],
    filteredBoard: null,
    board: null,
    isBoardModalOpen: false,
    dynamicModalObj: { isOpen: false, pos: { x: '', y: '' }, type: '' },
    filter: boardService.getDefaultFilterBoard()
}

export function boardReducer(state = initialState, action) {
    let boards
    switch (action.type) {
        case SET_BOARDS:
            return { ...state, boards: action.boards }
        case SET_BOARD:
            return { ...state, board: { ...action.board } }
        case SET_FILTER_BOARD:
            return { ...state, filteredBoard: { ...action.filteredBoard } }
        case REMOVE_BOARD:
            boards = state.boards.filter(board => board._id !== action.boardId)
            return { ...state, boards }
        case ADD_BOARD:
            boards = [action.board, ...state.boards]
            return { ...state, boards }
        case UPDATE_BOARD:
            boards = state.boards.map(board => (board._id === action.board._id) ? action.board : board)
            return { ...state, boards }
        case SET_MODAL:
            return { ...state, isBoardModalOpen: action.isOpen }

        case SET_FILTER:
            return { ...state, filter: action.filter }


        case SET_DYNAMIC_MODAL:{
            return {...state, dynamicModalObj: action.dynamicModalObj}
        }
        default:
            return state
    }
}
