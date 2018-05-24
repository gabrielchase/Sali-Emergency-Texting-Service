const admin = require('firebase-admin');
const g = require('ngeohash')
const twilio = require('./twilio')
const serviceAccount = require('./service_account.json')
const _ = require('lodash')

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://saliv1-af745.firebaseio.com'
})

const get_nearby_users_numbers = (lat, lng) => {
    return new Promise((resolve, reject) => {
        const ref = admin.database().ref('users')
            .orderByChild('g5')
            .startAt(g.neighbor_int(g.encode_int(lat, lng, 26), [-1, -1], 26))
            .endAt(g.neighbor_int(g.encode_int(lat, lng, 26), [1, 1], 26))
        
        ref.once('value', (snapshot) => {
            const numbers = [];
            snapshot.forEach((childSnapshot) => {
                numbers.push(childSnapshot.child('phone').val())
            })
            resolve(numbers)
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
    
}

module.exports = function(req, res) {
    const place = req.body.place
    const lat = req.body.lat
    const lng = req.body.lng 

    get_nearby_users_numbers(lat, lng)
        .then(nums => {
            const numbers = _.uniq(nums)
            console.log('Numbers: ', numbers)

            message = 'Sent text to: '
            
            for (let number of numbers) {
                message += `${number} `
                sendText(number, place, lat, lng)
            }

            res.status(200).send({ message: message })
        })
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
