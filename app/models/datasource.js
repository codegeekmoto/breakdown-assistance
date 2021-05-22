const Users = require('./user')
const Service = require('./service')
const CompanyService = require('./companyService')
const User = require('./user')

module.exports = {
    user: new User(),
    service: new Service(),
    companyService: new CompanyService()
}