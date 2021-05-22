var webRoutes = (router) => {

    // Pages
    const auth = require('../controllers/web/auth.cont.web')
    const pages = require('../controllers/web/pages.cont.web')

    // Middlewares
    const middleware = require('../middlewares/auth.middle')

    router.get('/login', auth.login)
    router.get('/register', auth.register)

    router.get('/', middleware.auth, pages.services)
    router.get('/mechanics', middleware.auth, pages.mechanics)
    router.get('/profile', middleware.auth, pages.profile)
}

module.exports = webRoutes;