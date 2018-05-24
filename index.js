const functions = require('firebase-functions')
const sendText = require('./sendText')

exports.sendText = functions.https.onRequest(sendText)
