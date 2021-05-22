const model = require('../../models/datasource')


exports.services = async (req, resp) => {
    var services = await model.companyService.withServices(req.session.user.id)

    console.log('services.rows', JSON.stringify(services.rows));

    resp.render('services', {
        title: 'Services',
        user: req.session.user,
        services: JSON.stringify(services.rows)
    })
}

exports.mechanics = async (req, resp) => {
    resp.render('mechanics', {
        title: 'Mechanics',
        user: req.session.user
    })
}

exports.profile = async (req, resp) => {
    resp.render('profile', {
        title: 'My Profile',
        user: req.session.user,
        userJson: JSON.stringify(req.session.user)
    })
}