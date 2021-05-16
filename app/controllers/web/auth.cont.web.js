const User = require('../../models/user')

exports.login = async (req, resp) => {    
    resp.render('auth/login', { title: 'Login'})
}

exports.register = async (req, resp) => {    
    resp.render('auth/register', { title: 'Registration'})
}