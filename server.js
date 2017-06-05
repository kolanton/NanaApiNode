// BASE SETUP
// =============================================================================

// call the packages we need
const express = require('express'); // call express
const cors = require('cors'); //cors
const app = express(); // define our app using express
const bodyParser = require('body-parser');
const apiRoutes = require('./apiRoutes');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(cors());

var port = process.env.PORT || 8000; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// REGISTER OUR ROUTES -------------------------------
apiRoutes.init(router);

// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

