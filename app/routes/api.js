var apiRoutes = router => {

    const auth = require('../controllers/api/auth.cont.api')
    const company = require('../controllers/api/company.cont')
    const user = require('../controllers/api/user.cont.api')
    const service = require('../controllers/api/service.cont')
    const mechanic = require('../controllers/api/mechanic.cont')
    const admin = require('../controllers/api/admin.cont')

    // Auth
    router.post('/auth/login', auth.login)
    router.post('/auth/register', auth.validateUser, auth.register)
    router.post('/auth/logout', auth.logout)

    // User
    router.post('/user/update', user.update)
    router.post('/user/change-password', user.changePassword)

    // Company
    router.post('/service/update', company.updateService)
    router.get('/service/alert', company.observeAlert)
    
    // Services
    router.get('/service/:id', service.get)
    router.post('/service/save', service.save)
    router.get('/company/services/:id', service.companyService)

    // Mechanic
    router.get('/mechanic/all/:id', mechanic.all)
    router.post('/mechanic/activate', mechanic.activate)


    // admin
    router.post('/company/update', admin.updateCompany)
}

module.exports = apiRoutes;