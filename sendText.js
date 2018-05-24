const twilio = require('./twilio')

module.exports = function(req, res) {
    const numbers = req.body.numbers
    const place = req.body.place
    const lat = req.body.lat
    const lng = req.body.lng 
    
    numbers_array = numbers.split(',')
    message = 'Sent text to: '
    console.log('Numbers to send to: ', numbers_array)
    
    for (let number of numbers_array) {
        message += `${number} `
        sendText(number, place, lat, lng)
    }

    res.status(200).send({ message: message })
}

function sendText(number, place, lat, lng) {
    console.log(`sending text to: ${number}`)
    const google_maps_link = `https://google.com/maps/?q=${lat},${lng}`
    const res = twilio.messages.create({
        body: `Emergency at ${place}!\n${google_maps_link}`,
        to: `+63${number}`,
        from:  '+19166341740'
    })
    console.log(res)
}
