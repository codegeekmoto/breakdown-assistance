var model = require('../../models/datasource')
var notif = require('../../helpers/notification')
var randomstring = require("randomstring");

exports.getAssistance = async (req, resp) => {
    const { mechanic_id, service_id, user_id, lat, lng  } = req.body

    console.log('req.body', req.body);

    try {

        var recieverTk = null
        var serviceLoc = null
        var ownerId = null
        var client = await model.user.findById(user_id)

        console.log('mechanic_id', mechanic_id);


        if (mechanic_id !== null && mechanic_id !== undefined) {
            var fcm = await model.fcmToken.select('user_id', mechanic_id)
            console.log('fcm mechanic_id', fcm.rows);
            recieverTk = fcm.rows[0].token

        } else {
            const companyService = await model.companyService.findById(service_id)
            var fcm = await model.fcmToken.select('user_id', companyService.rows[0].user_id)
            console.log('companyService service_id', companyService.rows);
            console.log('fcm service_id', fcm.rows);
            recieverTk = fcm.rows[0].token
            serviceLoc = companyService.rows[0].latlng
            ownerId = companyService.rows[0].user_id
        }

        var code = await randomstring.generate(5);

        console.log('code', code);

        var jobs = await model.job.insert(
            'company_service_id, owner_id,  mechanic_id, client_id, client_loc, status, code',
            [  service_id, ownerId,  mechanic_id, user_id, { lat: lat, lng: lng }, 'Requesting', code ]
        )

        var detail = {
            client: client.rows[0],
            mechanic_id: mechanic_id,
            service_id: service_id,
            client_loc: {
                lat: lat,
                lng: lng
            },
            service_loc: serviceLoc
        }

        var content = {
            data: {
                type: 'get-assistance',
                content: JSON.stringify(detail)
            },
            notification: {
                title: 'Need Assistance',
                body: ''
            }
        }

        await notif.send(recieverTk, content)

        return resp.status(200).send({
            status: true, 
            alert: detail
        });
        
    } catch (error) {
        console.log('[assistance getAssistance controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.accept = async (req, resp) => {
    var { job_id, mechanic_id } = req.body
    

    console.log('mechanic_id', mechanic_id);

    try {

        var mechanicJob = await model.mechanicJob.insert('job_id, mechanic_id', [job_id, mechanic_id])
        var jobs = await model.job.update('status', 'Accepted', 'id', job_id)

        console.log('jobs', jobs.rows);

        var content = {
            data: {
                type: 'assistance-accepted',
                content: JSON.stringify(jobs.rows[0])
            },
            notification: {
                title: 'Get Assistance',
                body: 'Your request has been accepted. Mechanic is on the way to you!'
            } 
        }
        
        await notif.sendTo(jobs.rows[0].client_id, content)

        return resp.status(200).send({
            status: true, 
            jobs: jobs.rows[0]
        });

    } catch (error) {
        console.log('[assistance accept controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.refuse = async (req, resp) => {
    var { client_id, job_id } = req.body

    try {

        var job = await model.job.update('status', 'Refused', 'id', job_id)
        
        var content = {
            data: {
                type: 'assistance-refused',
                content: 'Assistance is refued'
            },

            notification: {
                title: 'Get Assistance',
                body: 'Sorry, your request has been refused.'
            }
        }
        
        await notif.sendTo(client_id, content)

        return resp.status(200).send({
            status: true, 
            job: job.rows[0]
        });

    } catch (error) {
        console.log('[assistance refuse controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}



// Client

exports.clientTransaction = async (req, resp) => {

    var { type, user_id } = req.body

    try {
        var transac = await getJobs(type, user_id)
        return resp.status(200).send({
            status: true,
            jobs: transac
        });
    } catch (error) {
        console.log('[assistance clientTransaction controller]', error);
        resp.status(500).send({
            status: false,
            error: error.message
        })
    }
}

exports.complete = async (req, resp) => {
    var { job_id } = req.body

    var job = await model.job.update('status', 'Completed', 'id', parseInt(job_id))
    return resp.status(200).send({
        status: true,
        data: job.rows[0]
    });
}

// Get jobs
async function getJobs(type, id) {
    return new Promise(async (resolve, reject) => {
        try {

            var transac = []
            var hist = []

            var jobsData = await model.job.select(type, id)
            var jobs = jobsData.rows
            
            for (var job of jobs) {

                var clientRow = await model.user.select('id', job.client_id)
                let client = clientRow.rows[0]

                job.client_fname = client.fname
                job.client_lname = client.lname
                job.client_phone = client.phone

                if (job.mechanic_id != null) {
                    var mechanicRow = await model.user.select('id', job.mechanic_id)
                    let mechanic = mechanicRow.rows[0]
                    job.mechanic_fname = mechanic.fname
                    job.mechanic_lname = mechanic.lname
                    job.mechanic_phone = mechanic.phone
                } else {
                    job.mechanic_fname = null
                    job.mechanic_lname = null
                    job.mechanic_phone = null
                }

                if (job.status === 'Accepted' || job.status === 'On-Progress') {
                    transac.push(job)
                } else if (job.status === 'Completed') {
                    hist.push(job)
                }
            }

            resolve({
                transaction: transac,
                history: hist
            })
            
        } catch (error) {
            reject(error)
        }
    })
}

exports.getMechanics = async (req, resp) => {
    var mechanics = await model.user.select('role', 'mechanic')

    return resp.status(200).send({
        status: true,
        mechanics: mechanics.rows
    });
}