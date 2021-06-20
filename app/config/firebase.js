var admin = require('firebase-admin')

var serviceAccount = require('../../firebaseAcccount.json');


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

module.exports = admin