const logger = require('../services/logger.service')

async function log(req, res, next) {
  // logger.info('Sample Logger Middleware')
  next()
}

module.exports = {
  log
}
