var secret = require('../config/config').secret

exports.auth = (req, resp, next) => {

    console.log('HEADERS', req.headers['content-type']);

    if (req.session.user) {
        next();
    } else {
        if (req.headers['content-type'] === 'application/json') {
            resp.status(401).send({
                success: false, 
                message: 'Unauthorized'
            });
        } else {
            resp.redirect('/login')
        }
    }
}

exports.activated = (req, resp, next) => {
    const user = req.session.user;

    if (user.email_verified !== null && user.email_verified !== false) {
        next();
    } else {
        resp.redirect('/activate')
    }
}