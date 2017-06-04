//db config
var dbConfig = require("./dbConfig.json");
// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
const sql = require('mssql')

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

router.get('/mainTopFour', function (req, res) {
    let query = "SELECT TOP 4 * FROM [TenTvAppFront_Main] order by DisplayOrder";
    runSql(res, req,query);
});

router.get('/mainFeed', function (req, res) {
    let query = "select *" +
        "from (select top 1000 Row_Number() over (order by DisplayOrder) as RowNumber," +
        "*    from [TenTvAppFront_Main]) as PagedTable where RowNumber between 5 and 1000 order by DisplayOrder";
    runSql(res, req,query);
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);

function runSql(res, req, query) {
    sql.connect(dbConfig, err => {
        // ... error checks 

        // Query 

        new sql.Request().query(query, (err, result) => {
            // ... error checks 

            res.json(result);
        })

        // Stored Procedure 

        // new sql.Request()
        //     .input('input_parameter', sql.Int, value)
        //     .output('output_parameter', sql.VarChar(50))
        //     .execute('procedure_name', (err, result) => {
        //         // ... error checks 

        //         console.dir(result)
        //     })
    })

    sql.on('error', err => {
        // ... error handler 
    })
}