const model = require('../../models/datasource')
const constants = require('../../config/constants')

exports.get = async (req, resp) => {

    var services = await model.service.selectAll()

    return resp.status(200).send({
        status: true,
        service: services.rows
    });

}

exports.save = async (req, resp) => {
    const { service_id, description, address, location, mobile } = req.body

    console.log('req.body', req.body);

    try {
        var service = await model.companyService.insert('service_id, user_id, description, address, latlng, activated, mobile',
            [ service_id, req.session.user.id, description, address, JSON.stringify(location), true, mobile ]
        )

        service = await model.companyService.withServicesById(service.rows[0].id)

        console.log('service', service.rows);

        return resp.status(200).send({
            status: true,
            service: service.rows[0]
        });

    } catch (error) {
        resp.status(500).send({
            status: false,
            error: error.message,
            code: constants.ERROR.HTTP.INTERNAL_SERVER_ERROR
        })
    }
}

exports.companyService = async (req, resp) => {
    console.log('req.params.id', req.params.id);
    try {
        var services = await model.companyService.withServicesByservicesId(req.params.id)
        return resp.status(200).send({
            status: true,
            service: services.rows
        });
    } catch (error) {
        resp.status(500).send({
            status: false,
            error: error.message,
            code: constants.ERROR.HTTP.INTERNAL_SERVER_ERROR
        })
    }
}

exports.getJobs = async (req, resp) => {

    // var data = {
    //     client: "",
    //     mechanic: "",
    //     job: "",
    //     service: 
    // }
}