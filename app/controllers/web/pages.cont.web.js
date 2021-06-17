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
    const myCompany = await model.company.select('user_id', req.session.user.id)
    var mechanics = await model.user.selectActivated('mechanic')
    console.log('mechanics', mechanics.rows);

    const myMechanic = await model.companyMechanic.findById(myCompany.rows[0].id)

    console.log('myMechanic', myMechanic.rows);

    resp.render('mechanics', {
        title: 'Mechanics',
        user: req.session.user,
        mechanics: JSON.stringify(mechanics.rows),
        myMechanics: JSON.stringify(myMechanic.rows)
    })
}

exports.profile = async (req, resp) => {
    resp.render('profile', {
        title: 'My Profile',
        user: req.session.user,
        userJson: JSON.stringify(req.session.user)
    })
}

// Admin pages
exports.adminProfile = async (req, resp) => {
    resp.render('admin/profile', {
        title: 'My Profile',
        user: req.session.user,
        userJson: JSON.stringify(req.session.user)
    })
}

exports.adminCompany = async (req, resp) => {

    var companies = await model.company.withOwner()

    console.log('companies', companies.rows);

    resp.render('admin/company', {
        title: 'Companies',
        user: req.session.user,
        userJson: JSON.stringify(req.session.user),
        companies: JSON.stringify(companies.rows)
    })
}

exports.adminMechanics = async (req, resp) => {

    var mechanics = await model.user.select('role', 'mechanic')

    console.log('mechanics', mechanics.rows);

    resp.render('admin/mechanic', {
        title: 'Mechanics',
        user: req.session.user,
        mechanics: JSON.stringify(mechanics.rows)
    })

}