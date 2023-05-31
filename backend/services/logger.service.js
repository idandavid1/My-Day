const fs = require('fs')
const asyncLocalStorage = require('./als.service')
const utilService = require('./util.service')


const logsDir = './logs'
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir)
}

//define the time format
function getTime() {
    let now = new Date()
    return now.toLocaleString('he')
}

function isError(e) {
    return e && e.stack && e.message
}

function doLog(level, ...args) {

    const strs = args.map(arg =>
        (typeof arg === 'string' || isError(arg)) ? arg : JSON.stringify(arg)
    )

    var line = strs.join(' | ')
    const store = asyncLocalStorage.getStore()
    const userId = store?.loggedinUser?._id
    const str = userId ? `(userId: ${userId})` : ''
    line = `${getTime()} - ${level} - ${line} ${str}\n`
    console.log(line)
    fs.appendFile('./logs/backend.log', line, (err) =>{
        if (err) console.log('FATAL: cannot write to log file')
    })
}

module.exports = {
    debug(...args) {
        if (process.env.NODE_NEV === 'production') return
        doLog('DEBUG', ...args)
    },
    info(...args) {
        doLog('INFO', ...args)
    },
    warn(...args) {
        doLog('WARN', ...args)
    },
    error(...args) {
        doLog('ERROR', ...args)
    }
}