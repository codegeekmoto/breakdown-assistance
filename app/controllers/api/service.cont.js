const model = require('../../models/datasource')

exports.get = async (req, resp) => {

    var services = await model.service.selectAll()//getActiveServices(req.params.id)

    return resp.status(200).send({
        success: true,
        service: services.rows
    });

}