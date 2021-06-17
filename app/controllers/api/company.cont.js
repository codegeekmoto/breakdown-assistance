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

exports.observeAlert = async (req, resp) => {
    try {
        const myCompany = await model.company.select('user_id', req.session.user.id)
        const alerts = await model.companyAlert.find(myCompany.rows[0].id)

        return resp.status(200).send({
            status: true, 
            alerts: alerts.rows
        });
    } catch (error) {
        console.log('[company observeAlert controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.getAssistance = async (req, resp) => {
    const { service_id, user_id  } = req.body

    try {
        const alert = await model.companyAlert.insert(
            'company_service_id, client_id, is_accepted, is_received, is_valid',
            [service_id, user_id, false, false, true]
        )

        
    } catch (error) {
        console.log('[company getAssistance controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}