const boardService = require('./board.service.js')

const logger = require('../../services/logger.service')

async function getBoards(req, res) {
  try {
    logger.debug('Getting Boars')
    const filterBy = {
      title: req.query.title || '',
    }
    filterBy.isStarred = req.query.isStarred === 'true' ? true : false

    const boards = await boardService.query(filterBy)
    res.json(boards)
  } catch (err) {
    logger.error('Failed to get boards', err)
    res.status(500).send({ err: 'Failed to get boards' })
  }
}

async function getBoardById(req, res) {
  try {
    const boardId = req.params.boardId
    const board = await boardService.getById(boardId)
    res.json(board)
  } catch (err) {
    logger.error('Failed to get board', err)
    res.status(500).send({ err: 'Failed to get board' })
  }
}

async function addBoard(req, res) {
  try {
    const board = req.body
    const addedBoard = await boardService.add(board)
    res.json(addedBoard)
  } catch (err) {
    logger.error('Failed to add board', err)
    res.status(500).send({ err: 'Failed to add board' })
  }
}


async function updateBoard(req, res) {
  try {
    const board = req.body
    const updatedBoard = await boardService.update(board)
    res.json(updatedBoard)
  } catch (err) {
    logger.error('Failed to update board', err)
    res.status(500).send({ err: 'Failed to update board' })

  }
}

async function removeBoard(req, res) {
  try {
    const boardId = req.params.boardId
    const removedId = await boardService.remove(boardId)
    res.send(removedId)
  } catch (err) {
    logger.error('Failed to remove board', err)
    res.status(500).send({ err: 'Failed to remove board' })
  }
}

async function updateTask(req, res) {
  try {
    const task = req.body
    const {boardId, groupId, taskId} = req.params
    const taskToSend = await boardService.updateTask(boardId, groupId, taskId, task)
    res.send(taskToSend)
  } catch (err) {
    logger.error('Failed to update task', err)
    res.status(500).send({ err: 'Failed to update task' })
  }
}

async function updateGroup(req, res) {
  try {
    const group = req.body
    const {boardId, groupId} = req.params
    const groupToSend = await boardService.updateGroup(boardId, groupId, group)
    res.send(groupToSend)
  } catch (err) {
    logger.error('Failed to update group', err)
    res.status(500).send({ err: 'Failed to update group' })
  }
}

// async function addCarMsg(req, res) {
//   const {loggedinUser} = req
//   try {
//     const carId = req.params.id
//     const msg = {
//       txt: req.body.txt,
//       by: loggedinUser
//     }
//     const savedMsg = await carService.addCarMsg(carId, msg)
//     res.json(savedMsg)
//   } catch (err) {
//     logger.error('Failed to update car', err)
//     res.status(500).send({ err: 'Failed to update car' })

//   }
// }

// async function removeCarMsg(req, res) {
//   const {loggedinUser} = req
//   try {
//     const carId = req.params.id
//     const {msgId} = req.params

//     const removedId = await carService.removeCarMsg(carId, msgId)
//     res.send(removedId)
//   } catch (err) {
//     logger.error('Failed to remove car msg', err)
//     res.status(500).send({ err: 'Failed to remove car msg' })

//   }
// }

module.exports = {
  getBoards,
  getBoardById,
  addBoard,
  updateBoard,
  removeBoard,
  updateTask,
  updateGroup
}
