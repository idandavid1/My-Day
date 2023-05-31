const dbService = require('../../services/db.service')
const logger = require('../../services/logger.service')
const ObjectId = require('mongodb').ObjectId

async function query(filterBy) {
    try {
        const criteria = {}
       if(filterBy.title) criteria.title = { $regex: filterBy.title, $options: 'i' }
       if(filterBy.isStarred) criteria.isStarred = filterBy.isStarred
        const collection = await dbService.getCollection('board')
        var boards = await collection.find(criteria).toArray()
        return boards
    } catch (err) {
        logger.error('cannot find boards', err)
        throw err
    }
}

async function getById(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        const board = collection.findOne({ _id: ObjectId(boardId) })
        return board
    } catch (err) {
        logger.error(`while finding board ${boardId}`, err)
        throw err
    }
}

async function remove(boardId) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.deleteOne({ _id: ObjectId(boardId) })
        return boardId
    } catch (err) {
        logger.error(`cannot remove board ${boardId}`, err)
        throw err
    }
}

async function add(board) {
    try {
        const collection = await dbService.getCollection('board')
        await collection.insertOne(board)
        return board
    } catch (err) {
        logger.error('cannot insert board', err)
        throw err
    }
}

async function update(board) {
    try {
        const boardToSave = {...board}
        delete boardToSave._id
        const collection = await dbService.getCollection('board')
        await collection.updateOne({ _id: ObjectId(board._id) }, { $set: boardToSave })
        return board
    } catch (err) {
        logger.error(`cannot update board ${board._id}`, err)
        throw err
    }
}

async function updateTask(boardId, groupId, taskId, saveTask){
    try {
        const board =  await getById(boardId)
        const group = board.groups.find(group => group.id === groupId)
        group.tasks = group.tasks.map(task => (task.id === taskId) ? saveTask : task)
        await update(board)
        return board
    } catch (err) {
        logger.error(`cannot update task ${taskId}`, err)
        throw err
    }
}

async function updateGroup(boardId, groupId, saveGroup){
    try {
        const board =  await getById(boardId)
        board.groups = board.groups.map(group => (group.id === groupId) ? saveGroup : group)
        await update(board)
        return board
    } catch (err) {
        logger.error(`cannot update task ${groupId}`, err)
        throw err
    }
}

module.exports = {
    remove,
    query,
    getById,
    add,
    update,
    updateTask,
    updateGroup
}
