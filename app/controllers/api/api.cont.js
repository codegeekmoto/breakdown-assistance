class ApiController {

    responseJson(resp, statusCode, dataKey, data) {
        resp.status(statusCode).send({
            status: 'success',
            [dataKey]: data 
        })
    }
}

module.exports = ApiController;