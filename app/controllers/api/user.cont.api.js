var model = require('../../models/datasource')
var bcrypt = require('bcrypt');

exports.update = async (req, resp) => {
    const { phone, email, id } = req.body

    console.log('req.body', req.body);

    try {

        const isEmailExists = await model.user.isEmailExistsById(id, email)

        if (isEmailExists) {
            return resp.status(200).send({status: false, message: 'Email already exists'})
        }

        var user = await model.user.updateInfo(id, email, phone)

        console.log('user.rows', user.rows);

        if (user.rowCount > 0) {
            resp.status(200).send({status: true, user: user.rows})
        } else {
            resp.status(200).send({status: false, message: 'Failed to update profile'})
        }

    } catch (error) {
        console.log('[user update controller]', error)
        resp.status(500).send({status: false, error: error.message})
    }
}

exports.changePassword = async (req, resp) => {
    var {id, password} = req.body;

    try {
        bcrypt.hash(password, 10, async function(err, hash) {
            const user = await model.user.changePassword(id, hash)

            if (user.rowCount > 0) {
                resp.status(200).send({status: true, user: user.rows})
            } else {
                resp.status(200).send({status: false, message: 'Failed to change password'})
            }
        });
    } catch (error) {
        console.log('[user changePassword controller]', error)
        resp.status(500).send({status: false, error: error.message})
    }
}