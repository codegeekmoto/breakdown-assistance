const model = require('../../models/datasource')

exports.updateService = async (req, resp) => {
    const { id, activate } = req.body

    try {
        const service = await model.companyService.update('activated', activate, 'id', id)
        if (service.rowCount > 0) {
            return resp.status(200).send({
                status: true, 
                service: service.rows[0]
            });
        } else {
            return resp.status(200).send({
                status: false, 
                message: 'Update service failed!'
            });
        }
    } catch (error) {
        console.log('[company controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}   