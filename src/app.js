const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

//console.log(__dirname) // oldugu klasorun adresi path
//console.log(path.join(__dirname,'../public')) // dosyanin adresi path

const app =express() // cunku express function
const port= process.env.PORT || 3000

//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath= path.join(__dirname, '../templates/views') // tempalte kalsorune ulasmak ixcin
const partialsPaths= path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views locqtion
app.set ('view engine','hbs')
app.set('views' ,viewsPath)
hbs.registerPartials(partialsPaths)

//Setup static directory to use

app.use (express.static(publicDirectoryPath))

app.get('', (req,res)=>{ // send yerine render yapicaz dynmaic page yapiyoeuz
    res.render('index',{
        title: 'weather app',
        name: 'hakki'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
        title: 'About US',
        name: 'hakki ozbey'
    })
})

app.get('/help', (req, res ) =>{
    res.render('help',{
        helpText: 'weather app',
        name: 'hakki',
        title: 'help'
    })
})

app.get('',(req, res)=>{ // unlem icinde adres fonskiyon icinde ne yapmak istegimiz o adreste
    res.send('<h1>Weather<h1>') //this allaws us to send dth back to requester

})

// app.get('/help',(req,res ) =>{
//     res.send({
//         name: 'hakki', //sending back json
//         age: 27
//     })

// })




// app.get('/about',(req,res ) =>{
//     res.send('<h1>Abouto Page<h1>')

// })
//

app.get('/weather',(req,res ) =>{
    if(!req.query.address){
        return res.send({
            error:'You mjst provide an adress'
        })
    }
    geocode(req.query.address,(error, {latitude, longtitude, location} = {} ) => { // {} default params
        if (error) {
            return res.send({error})
        }

        forecast(latitude, longtitude, (error,forecastData)=>{
            if (error){
                return res.send({error})
            
            }

            res.send ({
                forecast: forecastData,
                location,
                address : req.query.address
            })

        })


    })



})

app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a seaxcrh' 
        })

    }    

    console.log(req.query.search)
    res.send({
        products :[]
    })

})

app.get ('/help/*',(req, res )=> { // /help/me yazinca 404 e atmasin diye
    res.render('404', {
        title: '404',
        name: 'Hakki',
        errorMessage: 'Help article not found'
    })

})

app.get('*',(req, res)=>{  //404 page hep sonda bakmali express teker teker bakiyor * isareti bu sayfalar d
    //baska sayfalar demek
    res.render('404',{
        title: '404',
        name : 'Hakki',
        errorMessage: 'Page not found'
    })

})

app.listen (port,() =>{
    console.log('server is up on port ' + port)

}) //start up the server