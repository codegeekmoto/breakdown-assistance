const Model = require('./model')

class CompanyAlert extends Model {

    constructor() {
        super('company_alert')
    }

    async find(id) {
        const sql =`SELECT * FROM company_alert
                    WHERE is_valid = $1
                        AND is_received = $2
                        AND company_id = $3`
        return await this.execute(sql, [true, false, id])
    }

    async withUser(companyId) {
        const sql =`SELECT company_alert.*, users.fname, users.lname
                    FROM users
                        INNER JOIN company_alert ON users.id = company_alert.client_id
                    WHERE is_valid = $1
                        AND is_received = $2
                        AND company_id = $3`
        
        return await this.execute(sql, [true, false, companyId])
    }
}

module.exports = CompanyAlert