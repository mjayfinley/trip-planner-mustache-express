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


app.post('/trips',function(req,res){

  let trip = req.body.destination
  let leave = req.body.departure
  let comeBack = req.body.comeBack

  trips.push({tripId : guid(),trip : trip,departureDate : leave,returnDate : comeBack})

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

app.delete('/trips/:tripId',function(req,res){
  let tripRemove = req.params.tripId

  //possible splice? nothing has worked thus far
  trips.remove({tripId: tripRemove})

  res.render('index',{trips: trips})
})




app.listen(3000, () => console.log('Example app listening on port 3000!'))
