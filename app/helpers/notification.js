// import {admin}  from '../config/firebase.js'

var admin = require('../config/firebase')

const options = require('../config/config').firebase.notification_options

exports.send = (token, content) => {
    return admin.messaging().sendToDevice(token, content, options)
}

exports.sendMultiple = (tokens, topic) => {
    return admin.messaging().subscribeToTopic(tokens, topic)
}