var model = require('../../models/datasource')

exports.getAssistance = async (req, resp) => {
    const { mechanic_id, service_id, user_id, lat, lng  } = req.body

    try {
        
    } catch (error) {
        
    }

    return resp.status(200).send({
        status: true, 
        data: req.body
    });
}

async function mechanicAssistance(data) {

}

async function companyAssistance(data) {
    
}