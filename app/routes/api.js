var apiRoutes = router => {

    const auth = require('../controllers/api/auth.cont.api')

    // Auth
    router.post('/auth/login', auth.login)
    router.post('/auth/register', auth.validateUser, auth.register)

}

module.exports = apiRoutes;