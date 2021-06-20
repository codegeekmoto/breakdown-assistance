const Users = require('./user')
const Service = require('./service')
const CompanyService = require('./companyService')
const User = require('./user')
const Company = require('./company')
const CompanyMechanic = require('./companyMechanic')
const CompanyAlert = require('./companyAlert')
const FcmToken = require('./fcmToken')

module.exports = {
    user: new User(),
    service: new Service(),
    company: new Company(),
    companyService: new CompanyService(),
    companyMechanic: new CompanyMechanic(),
    companyAlert: new CompanyAlert(),
    fcmToken: new FcmToken()
}