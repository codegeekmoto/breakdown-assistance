const Pool = require('pg').Pool
const config = require('../config/config')

const postgresDb = new Pool({
    host: config.db.host,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})

module.exports = postgresDb;