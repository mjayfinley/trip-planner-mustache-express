const express = require('express')
const app = express()
const mustacheExpress = require('mustache-express')

var bodyParser = require('body-parser')

let trips = []


app.use(express.static('public'))


app.use(bodyParser.urlencoded({ extended: false}))


app.engine('mustache',mustacheExpress())


app.set('views','./views')


app.set('view engine','mustache')


app.get('/',function(req,res){
  res.render('index')
})

app.get('/trips',function(req,res){
  res.render('index',{trips: trips})
})


app.post('/trips',function(req,res){

  let tripId = guid()
  let trip = req.body.destination
  let leave = req.body.departure
  let comeBack = req.body.comeBack
  let image = req.body.image

  trips.push({tripId : tripId,trip : trip,departureDate : leave,returnDate : comeBack,image : image})

  //create new route/page to list trips?
  res.render('index',{trips: trips})

})

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}


app.post('/deleteTrip',function(req,res){

  let tripId = req.body.deletedTrip

  trips = trips.filter(function(trip){
    return trip.tripId != tripId

  })

  res.render('index',{trips: trips})
})


/*
app.delete('/trips/:tripId',function(req,res){
  let tripRemove = req.params.tripId

  //possible splice? nothing has worked thus far
  trips.remove({tripId: tripRemove})

  res.render('index',{trips: trips})
})
*/



app.listen(3000, () => console.log('Example app listening on port 3000!'))
