const Model = require('./model')

class Company extends Model {

    constructor() {
        super('company')
    }

    async withOwner() {
        const sql =`SELECT company.id,
                            users.id as user_id,
                            users.fname,
                            users.lname,
                            company.name,
                            company.activated,
                            company.created_at
                    FROM users
                        INNER JOIN company
                            ON users.id = company.user_id`;
        
        return this.execute(sql)
    }
}

module.exports = Company