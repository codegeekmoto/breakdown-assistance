var apiRoutes = router => {

    const auth = require('../controllers/api/auth.cont.api')
    const company = require('../controllers/api/company.cont')
    const user = require('../controllers/api/user.cont.api')
    const service = require('../controllers/api/service.cont')
    const mechanic = require('../controllers/api/mechanic.cont')

    // Auth
    router.post('/auth/login', auth.login)
    router.post('/auth/register', auth.validateUser, auth.register)
    router.post('/auth/logout', auth.logout)

    // User
    router.post('/user/update', user.update)
    router.post('/user/change-password', user.changePassword)

    // Company
    router.post('/service/update', company.updateService)
    
    // Services
    router.get('/service/:id', service.get)

    // Mechanic
    router.get('/mechanic/all/:id', mechanic.all)
}

module.exports = apiRoutes;