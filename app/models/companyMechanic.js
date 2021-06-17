const Model = require('./model')

class CompanyMechanic extends Model {

    constructor() {
        super('company_mechanic')
    }

    async findById(id) {
        const sql =`SELECT * FROM users
                        INNER JOIN company_mechanic
                            ON users.id = company_mechanic.user_id
                    WHERE company_mechanic.company_id = $1`;
        
        return await this.execute(sql, [id])
    }
}

module.exports = CompanyMechanic