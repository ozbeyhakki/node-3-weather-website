// const forecast =(latitude,longitude,callback) => {
//     const url = 'https://api.weatherstack.com/current?access_key=df1174f390f324c104bb328f08ad2252&query='+ latitude+ ',' + longitude +'&units=f'

//     request({url : url, json:true },(error,response)=>{
//         if (error){
//             callback('Unable to connect', undefined)
//         }else if (response.body.error) {
//             callback(' unable to find location', undefined)
//         }else{
//             callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. ')
            
//         }
//     })

// }

// module.exports= forecast
//
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=df1174f390f324c104bb328f08ad2252&query='+ latitude+ ',' + longitude +'&units=f'

    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            callback('Unable to find the fucking location', undefined)
        } else {
            console.log(body.daily.data[0])
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degress out. ')
        }
    })
}

module.exports = forecast