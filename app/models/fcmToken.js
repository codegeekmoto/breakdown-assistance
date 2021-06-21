var Model = require('./model')

class FcmToken extends Model {

    constructor() {
        super('fcm_token')
    }

    async get(userId, token) {
        const sql =`SELECT * FROM fcm_token
                    WHERE user_id = $1
                        AND token = $2`
        return this.execute(sql, [userId, token])
    }

    async whereIn(strIds) {
        const sql =`SELECT * FROM fcm_token
                    WHERE user_id IN (${strIds})`
        return this.execute(sql)
    }
}

module.exports = FcmToken