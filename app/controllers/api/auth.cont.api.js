const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const model = require('../../models/datasource');
const constants = require('../../config/constants')

exports.login = async (req, resp) => {

    let {email, role, password} = req.body;

    try {

        let user = await model.user.login(email, role)

        if (user.rowCount > 0) {
            bcrypt.compare(password, user.rows[0].password, function(error, result) {
                if (!error) {
                    if (result) {
                        req.session.user = user.rows[0]
    
                        resp.send({
                            status: true,
                            user: user.rows[0]
                        }, 200);

                    } else {
                        resp.status(200).send({
                            status: false,
                            error: 'Wrong email or password!',
                            code: constants.ERROR.RESOURCE_EXISTS
                        })
                    }
                } else {
                    resp.status(500).send({
                        status: false,
                        error: error.message,
                        code: constants.ERROR.HTTP.INTERNAL_SERVER_ERROR
                    });
                }
            });
        } else {
            resp.status(200).send({
                status: false,
                error: 'Wrong email or password!',
                code: constants.ERROR.RESOURCE_EXISTS
            })
        }        
    } catch (error) {
        resp.status(500).send({
            status: false,
            error: error.message,
            code: constants.ERROR.HTTP.INTERNAL_SERVER_ERROR
        })
    }
}

exports.register = async (req, resp) => {

    const validationErr = validationResult(req).array();
    const body = req.body;

    if (validationErr.length > 0) {
        return resp.status(200).send({
            status: false,
            error: validationErr,
            code: constants.ERROR.VALIDATION
        })
    }

    const userExist = await model.user.select('email', body.email)

    if (userExist.rowCount > 0) {
        return resp.status(200).send({
            status: false,
            message: 'Email already exists',
            code: constants.ERROR.RESOURCE_EXISTS
        })
    }

    bcrypt.hash(body.password, 10, async function(err, hash) {

        try {

            const colSet = 'fname, lname, email, role, phone, picture, password';
            const insertData = [body.fname, body.lname, body.email, body.role, body.phone, 
                                body.picture === undefined ? '' : body.picture, hash];

            const newUser = await model.user.insert(colSet, insertData)

            if (body.role === 'owner') {
                let services = await model.service.selectAll()

                if (services.rowCount > 0) {
                    for (const service of services.rows) {
                        await model.companyService.insert('service_id, user_id, activated',
                            [service.id, newUser.rows[0].id, false])
                    }
                }
            }

            return resp.status(200).send({
                status: true, 
                user: newUser.rows[0]
            });

        } catch (error) {
            console.log('[auth register]', error);
            resp.status(500).send({
                status: false,
                error: error.message,
                code: constants.ERROR.HTTP.INTERNAL_SERVER_ERROR
            })
        }
    });
}

exports.logout = async (req, resp) => {
    req.session.user = null
    return resp.status(200).send({
        status: true, 
        message: 'Logout success'
    });
}

exports.validateUser = [
    check('fname', 'First name is required.').isLength({ min: 1 }),
    check('lname', 'Last name is required.').isLength({ min: 1 }),
    check('email', 'Email is required.').isLength({ min: 1 }),
    check('password', 'password is required.').isLength({ min: 1 }),
    check('role', 'User Role is required.').isLength({ min: 1 }),
    check('phone', 'Phone is required.').isLength({ min: 1 })
]