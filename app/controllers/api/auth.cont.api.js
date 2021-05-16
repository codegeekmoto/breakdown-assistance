const User = require('../../models/user')
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');

exports.login = async (req, resp) => {

    let {email, password} = req.body;

    try {

        let user = await new User().select('email', email)

        if (user.rowCount > 0) {
            bcrypt.compare(password, user.rows[0].password, function(error, result) {
                if (!error) {
                    if (result) {
                        req.session.user = user.rows[0]
    
                        resp.send({
                            status: 'success',
                            user: user.rows[0]
                        }, 200);

                    } else {
                        resp.status(200).send({
                            status: false,
                            error: 'Wrong email or password!'
                        })
                    }
                } else {
                    resp.status(500).send({
                        status: 'error',
                        error: error.message
                    });
                }
            });
        } else {
            resp.status(401).send({
                status: false,
                error: 'Wrong email or password!'
            })
        }        
    } catch (error) {
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.register = (req, resp) => {

    const validationErr = validationResult(req).array();

    if (validationErr.length > 0) {
        return resp.status(200).send({
            status: false,
            error: validationErr
        })
    }

    const body = req.body;

    bcrypt.hash(body.password, 10, async function(err, hash) {

        try {

            const colSet = 'fname, lname, email, role, phone, picture, password';
            const insertData = [body.fname, body.lname, body.email, body.role, body.phone, 
                                body.picture === undefined ? '' : body.picture, hash];

            const newUser = await new User().insert(colSet, insertData)

            return resp.status(200).send({
                success: true, 
                user: newUser.rows[0]
            });

        } catch (error) {
            resp.status(500).send({
                status: false,
                error: error.message
            })
        }
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