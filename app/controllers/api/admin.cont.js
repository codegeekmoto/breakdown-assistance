const model = require('../../models/datasource')

exports.updateCompany = async (req, resp) => {
    const { id, activate } = req.body

    try {
        const company = await model.company.update('activated', activate, 'id', id)
        if (company.rowCount > 0) {
            return resp.status(200).send({
                status: true, 
                company: company.rows[0]
            });
        } else {
            return resp.status(200).send({
                status: false, 
                message: 'Update company failed!'
            });
        }
    } catch (error) {
        console.log('[admin controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}   