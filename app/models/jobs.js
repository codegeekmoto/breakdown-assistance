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

    async getClientTransactions(userId) {

        // return new Promise((resolve, reject) => {
        //     try {
        //         const sql =`SELECT * FROM jobs WHERE user_id = $s1`
        //         var jobs = await this.execute(sql, [ userId ])

        //         for (var job in jobs.rows) {
        //             var client = await 
        //         }
                
        //     } catch (error) {
        //         reject(error)
        //     }
        // })
    }

    // async getClientTransactions(userId) {

    //     const sql =`SELECT
    //                     services.name as service_name,
    //                     company.name as company_name,
    //                     client.fname as client_fname,
    //                     client.lname as client_lname,
    //                     client.phone as client_phone,
    //                     mechanic.fname as mechanic_fname,
    //                     mechanic.lname as mechanic_lname,
    //                     jobs.*
    //                 FROM services
    //                     INNER JOIN company_services as CS1 ON services.id = CS1.service_id
    //                     INNER JOIN company ON CS1.company_id = company.id
    //                     INNER JOIN company_services as CS2 ON company.id = CS2.company_id
    //                     LEFT JOIN jobs ON CS2.id = jobs.company_service_id
    //                     INNER JOIN users as client ON jobs.client_id = client.id
    //                     INNER JOIN jobs as JOB1 ON client.id = JOB1.client_id
    //                     LEFT JOIN users as mechanic ON JOB1.mechanic_id = mechanic.id
    //                 WHERE jobs.client_id = $1
    //                     AND jobs.status = 'Accepted'`

    //     return this.execute(sql, [ userId ])
    // }

    // async get() {
    //     const sql =`SELECT * 
    //                 FROM services
    //                     INNER JOIN company_services
    //                         ON services.id = company_services.service_id
    //                     INNER JOIN jobs
    //                         ON company_services.id = jobs.company_service_id
    //                     INNER JOIN users
    //                         ON jobs.client_id = users.id
    //                 WHERE jobs.owner_id = $1
    //                 ORDER BY jobs.created_at DESC`
        
    //     return this.execute(sql, [ userId ])
    // }
}


module.exports = Job