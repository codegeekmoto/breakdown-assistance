const model = require('../../models/datasource')


exports.services = async (req, resp) => {
    var companyServices = await model.companyService.withServices(req.session.user.id)
    var services = await model.service.selectAll()

    console.log('services.rows', companyServices.rows);

    resp.render('services', {
        title: 'Services',
        user: req.session.user,
        services: JSON.stringify(companyServices.rows),
        serviceTypes: services.rows
    })
}

exports.mechanics = async (req, resp) => {
    // try {
    //     var mechanics = await model.user.select('role', 'mechanic')
    //     return resp.status(200).send({
    //         status: true, 
    //         mechanics: mechanics.rows
    //     });
    // } catch (error) {
    //     console.log('[mechanic controller]', error);
    //     resp.status(500).send({
    //         status: false,
    //         error: error.message
    //     })
    // }
    var mechanics = await model.user.select('role', 'mechanic')

    console.log('mechanics', mechanics.rows);

    resp.render('mechanics', {
        title: 'Mechanics',
        user: req.session.user,
        mechanics: JSON.stringify(mechanics.rows)
    })
}

exports.profile = async (req, resp) => {
    resp.render('profile', {
        title: 'My Profile',
        user: req.session.user,
        userJson: JSON.stringify(req.session.user)
    })
}