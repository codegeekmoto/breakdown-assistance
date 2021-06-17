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
        console.log('myCompany', myCompany.rows);
        const alerts = await model.companyAlert.withUser(myCompany.rows[0].id)
        // const user = await model.user.findById(alerts.rows[0].client_id)

        console.log('alerts', alerts);

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
    const { service_id, user_id, lat, lng  } = req.body

    try {
        const companyService = await model.companyService.findById(service_id)

        console.log('companyService', companyService.rows);

        const alert = await model.companyAlert.insert(
            'company_id, company_service_id, client_id, is_accepted, is_received, is_valid, client_latlng',
            [companyService.rows[0].company_id, service_id, user_id, false, false, true, {
                lat: lat,
                lng: lng
            }]
        )

        return resp.status(200).send({
            status: true, 
            alert: alert.rows[0]
        });
        
    } catch (error) {
        console.log('[company getAssistance controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.receiveAlert = async (req, resp) => {
    const { alert_id  } = req.body

    try {
        const alert = await model.companyAlert.update('is_received', true, 'id', alert_id)

        return resp.status(200).send({
            status: true, 
            alert: alert.rows
        });
        
    } catch (error) {
        console.log('[company receiveAlert controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}