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