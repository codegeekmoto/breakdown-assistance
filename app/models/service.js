const Model = require('./model')

class Service extends Model {

    constructor() {
        super('services')
    }

    async getActiveServices(serviceId) {
        const sql =`SELECT * FROM services
                        INNER JOIN company_services on services.id = company_services.service_id
                    where services.id = $1`;
        
        return await this.execute(sql, [serviceId])
    }
}

module.exports = Service
