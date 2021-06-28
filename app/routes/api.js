var apiRoutes = router => {

    const auth = require('../controllers/api/auth.cont.api')
    const company = require('../controllers/api/company.cont')
    const user = require('../controllers/api/user.cont.api')
    const service = require('../controllers/api/service.cont')
    const mechanic = require('../controllers/api/mechanic.cont')
    const admin = require('../controllers/api/admin.cont')
    const notif = require('../controllers/api/notification.cont')
    const assistance = require('../controllers/api/assistance.cont')

    // Auth
    router.post('/auth/login', auth.login)
    router.post('/auth/register', auth.validateUser, auth.register)
    router.post('/auth/logout', auth.logout)

    // User
    router.post('/user/update', user.update)
    router.post('/user/change-password', user.changePassword)

    // Company
    router.post('/service/update', company.updateService)
    router.get('/jobs', company.jobs)
    // router.get('/service/alert', company.observeAlert)
    // router.post('/service/assistance', company.getAssistance)
    // router.post('/service/alert/receive', company.receiveAlert)
    
    // Services
    router.get('/service/:id', service.get)
    router.post('/service/save', service.save)
    router.get('/company/services/:id', service.companyService)

    // Mechanic
    router.get('/mechanic/all/:id', mechanic.all)
    router.post('/mechanic/activate', mechanic.activate)

    // Assistance
    router.post('/assistance', assistance.getAssistance)
    router.post('/accept', assistance.accept)
    router.post('/refuse', assistance.refuse)

    // Client
    router.post('/transaction', assistance.clientTransaction)
    router.post('/completed', assistance.complete)
    router.get('/mechanics', assistance.getMechanics)

    // admin
    router.post('/company/update', admin.updateCompany)

    // FCM Notification
    router.post('/fcm/register', notif.registerToken)
    router.post('/fcm/send', notif.send)

}

module.exports = apiRoutes;