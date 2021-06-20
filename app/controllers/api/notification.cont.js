const model = require('../../models/datasource')
var notif = require('../../helpers/notification')

exports.registerToken = async (req, resp) => {

    var { user_id, token} = req.body
    
    console.log('req.body',req.body);

    if (user_id == null) {
        user_id = req.session.user.id

        console.log('user_id', user_id);
    }

    try {

        var fcmTk = await model.fcmToken.get(user_id, token)

        if (fcmTk.rowCount == 0) {
            fcmTk = await model.fcmToken.insert(
                'user_id, token',
                [user_id, token]
            )
        }

        resp.send({
            status: true,
            fcm_token: fcmTk.rows[0]
        }, 200);
        
    } catch (error) {
        console.log('[Notication register token api controller', error);
        resp.status(500).send({
            status: false,
            error: error.message,
            code: constants.ERROR.HTTP.INTERNAL_SERVER_ERROR
        })
    }
    
    // var { token, message } = req.body

    //     var content = {
    //         data: {
    //         message: message
    //     },
    //     notification: {
    //         title: "Testing FCM",
    //         body: message
    //     }
    // }

    // notif.send(token, content)
    // .then( response => {

    //     console.log('FCM RESPONSE', response);

    //     resp.status(200).send("Notification sent successfully")
       
    //  })
    // .catch( error => {
    //     console.log('[ FIREBASE ERROR ]', error);
    //      resp.status(200).send("Notification sending failed")
    // });
}

exports.send = (req, resp) => {

    var { ids, message } = req.body

    console.log('ids', ids);

    //     var content = {
    //         data: {
    //         message: message
    //     },
    //     notification: {
    //         title: "Testing FCM",
    //         body: message
    //     }
    // }
}
