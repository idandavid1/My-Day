const express = require('express')
const { getBoards, getBoardById, addBoard, updateBoard, removeBoard, updateTask, updateGroup } = require('./board.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', getBoards)
router.get('/:boardId', getBoardById)
router.post('/', addBoard)
router.put('/:boardId/:groupId/:taskId', updateTask)
router.put('/:boardId/:groupId', updateGroup)
router.put('/:boardId', updateBoard)
router.delete('/:boardId', removeBoard)

// router.post('/:id/msg', requireAuth, addBoardMsg)
// router.delete('/:id/msg/:msgId', requireAuth, removeBoardMsg)

module.exports = router