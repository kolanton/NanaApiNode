// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express'); // call express
const cors = require('cors'); //cors
const app = express(); // define our app using express
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes').apiRoutes;
var http = require('http').Server(app);
var io = require('socket.io')(http);

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

var port = process.env.PORT || 8000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
let r = new apiRoutes(router);

// all of our routes will be prefixed with /api
app.use('/api', router);

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg);
  });
});


    
// START THE SERVER
// =============================================================================
// app.listen(port);
http.listen(8000, function(){
  console.log('listening on *:8000');
});

console.log('Magic happens on port ' + port);

