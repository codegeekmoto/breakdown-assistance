var admin = require('../config/firebase')
var model = require('../models/datasource')

const options = require('../config/config').firebase.notification_options

exports.send = async (token, content) => {
    var data = {
        data: content.data,
        notification: content.notification,
        android:{
            priority:"normal"
        },
        apns:{
            headers:{
                "apns-priority":"5"
            }
        },
        webpush: {
            headers: {
                Urgency: "high"
            }
        },
        token: token
    }

    return admin.messaging().send(data)
}

exports.sendTo = async (userId, content) => {

    try {

        var fcm = await model.fcmToken.select('user_id', userId)

        console.log('fcm', fcm);

        var data = {
            data: content.data,
            notification: content.notification,
            android:{
                priority:"normal"
            },
            apns:{
                headers:{
                    "apns-priority":"5"
                }
            },
            webpush: {
                headers: {
                    Urgency: "high"
                }
            },
            token: fcm.rows[0].token
        }
    
        return admin.messaging().send(data)
    } catch (error) {
        throw error
    }
}

exports.sendMultiple = (tokens, topic) => {
    return admin.messaging().subscribeToTopic(tokens, topic, {time_to_live: 0})
}