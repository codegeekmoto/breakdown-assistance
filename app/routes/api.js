var apiRoutes = router => {

    const auth = require('../controllers/api/auth.cont.api')
    const company = require('../controllers/api/company.cont')
    const user = require('../controllers/api/user.cont.api')

    // Auth
    router.post('/auth/login', auth.login)
    router.post('/auth/register', auth.validateUser, auth.register)

    // User
    router.post('/user/update', user.update)
    router.post('/user/change-password', user.changePassword)

    // Company
    router.post('/service/update', company.updateService)
}

module.exports = apiRoutes;