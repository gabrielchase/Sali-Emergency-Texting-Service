const twilio = require('./twilio')

module.exports = function(req, res) {
    const numbers = req.body.numbers
    numbers_array = numbers.split(',')
    console.log(numbers_array)
    message = 'Sent text to: '
    for (let number of numbers_array) {
        message += `${number} `
        sendText(number)
    }
    res.status(200).send({ message: message })
}

function sendText(number) {
    console.log(`sending text to: ${number}`)
    const res = twilio.messages.create({
        body: '<Name> needs help at <Location>',
        to: `+63${number}`,
        from:  '+19166341740'
    })
    console.log(res)
}
