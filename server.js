var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var massive = require('massive');


var app = express();
app.use(bodyParser.json());

var port = 3000;

var conn = massive.connectSync({ //establishes connection to the server. 
  connectionString : "postgres://postgres:@localhost/massive_demo"
});

app.set('db', conn); //app is reference to express app. Adding Postgres connection to express.

var db = app.get('db'); //pretend this is happing in a controller file.  db-reference to connection in database.
app.get('/injuries', function(req, res) {
  db.getAllInjuries(function(err, injuries){ //callback function. syncronis. 
      if(!err) {
        res.send(injuries);  // injuries will contain an array of injuries
      }
  }) 
});

app.get('/incidents', function(req, res){
  db.getAllIncidents(function(err, incidents){
    if(!err) {
      res.send(incidents);
    }
  })
})

app.post('/incidents', function(req, res) {
  var params = [
  req.body.us_state,
  req.body.injury_id, 
  req.body.cause_id
]
  db.newIncident(params, function(err, response){
    if(!err) {
      db.getAllIncidents(function(err, incidents){
        res.send(incidents);
      })
    }
  })
});

app.listen(port, function() {
  console.log("Started server on port", port);
});
