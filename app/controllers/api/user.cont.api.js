var model = require('../../models/datasource')
var bcrypt = require('bcrypt');
const constants = require('../../config/constants');

exports.update = async (req, resp) => {
    const { phone, email, id } = req.body

    try {

        const isEmailExists = await model.user.isEmailExistsById(id, email)

        if (isEmailExists) {
            return resp.status(200).send({status: false, message: 'Email already exists'})
        }

        var user = await model.user.updateInfo(id, email, phone)

        if (user.rowCount > 0) {
            resp.status(200).send({status: true, user: user.rows})
        } else {
            resp.status(200).send({status: false, message: 'Failed to update profile', code: constants.ERROR.OPERATION_FAILED})
        }

    } catch (error) {
        console.log('[user update controller]', error)
        resp.status(500).send({status: false, error: error.message, code: constants.ERROR.HTTP.INTERNAL_SERVER_ERROR})
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
                resp.status(200).send({status: false, message: 'Failed to change password', code: constants.ERROR.OPERATION_FAILED})
            }
        });
    } catch (error) {
        console.log('[user changePassword controller]', error)
        resp.status(500).send({status: false, error: error.message, code: constants.ERROR.HTTP.INTERNAL_SERVER_ERROR})
    }
}