const model = require('../../models/datasource')

exports.all = async (req, resp) => {
    try {
        var mechanics = await model.user.select('role', 'mechanic')
        return resp.status(200).send({
            status: true, 
            mechanics: mechanics.rows
        });
    } catch (error) {
        console.log('[mechanic controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.activate = async (req, resp) => {
    const { id, activate } = req.body

    try {
        const user = await model.user.update('activated', activate, 'id', id)
        if (user.rowCount > 0) {
            return resp.status(200).send({
                status: true, 
                user: user.rows[0]
            });
        } else {
            return resp.status(200).send({
                status: false, 
                message: 'Update user failed!'
            });
        }
    } catch (error) {
        console.log('[mechanic controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}   