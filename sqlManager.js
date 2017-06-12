//db config
const dbConfig = require("./dbConfig.json");
const sql = require('mssql');
const apiParser = require('./apiParser');

class sqlManager {
    static runSqlPromise(props) {
        sql.connect(dbConfig).then(pool => {
            // Query 

            return pool.request()
                .query(props.query)
        }).then(result => {
            let results = props.parserCallback(result);
            props.res.send(results);
        }).catch(err => {
            // ... error checks 
            console.dir(err);
        })

        sql.on('error', err => {
            // ... error handler 
            console.dir(err);
        })
    }
}

module.exports = sqlManager;