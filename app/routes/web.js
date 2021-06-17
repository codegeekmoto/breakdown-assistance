var webRoutes = (router) => {

    // Pages
    const auth = require('../controllers/web/auth.cont.web')
    const pages = require('../controllers/web/pages.cont.web')

    // Middlewares
    const middleware = require('../middlewares/auth.middle')

    router.get('/login', auth.login)
    router.get('/register', auth.register)

    router.get('/', middleware.auth, middleware.isCompany, pages.services)
    router.get('/mechanics', middleware.auth, middleware.isCompany, pages.mechanics)
    router.get('/profile', middleware.auth, middleware.isCompany, pages.profile)

    // Admin
    router.get('/admin', middleware.auth, middleware.isAdmin, pages.adminCompany)
    router.get('/admin/mechanics', middleware.auth, middleware.isAdmin, pages.adminMechanics)
    router.get('/admin/profile', middleware.auth, middleware.isAdmin, pages.adminProfile)
}

module.exports = webRoutes;