var Model = require('./model')

class Job extends Model {

    constructor() {
        super('jobs')
    }

    async all(userId) {
        const sql =`SELECT services.id as service_id, 
                            services.name,
                            jobs.*,
                            users.fname,
                            users.lname,
                            users.id as client_id
                    FROM services
                        INNER JOIN company_services
                            ON services.id = company_services.service_id
                        INNER JOIN jobs
                            ON company_services.id = jobs.company_service_id
                        INNER JOIN users
                            ON jobs.client_id = users.id
                    WHERE jobs.owner_id = $1
                    ORDER BY jobs.created_at DESC`
        
        return this.execute(sql, [ userId ])
    }
}


module.exports = Job