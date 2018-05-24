const twilio = require('twilio')
const accountSid = 'ACf67f6736f06fca6c6927a8aef0afdb07'
const authToken = 'f596f130a605609d9a9ad0a5fbe06463'

module.exports = new twilio.Twilio(accountSid, authToken)
