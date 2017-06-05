//db config
const dbConfig = require("./dbConfig.json");
const sql = require('mssql');
const apiParser = require('./apiParser');

class sqlManager {
    static runSqlPromise(res, req, query, isHeadlines = false) {
        sql.connect(dbConfig).then(pool => {
            // Query 

            return pool.request()
                .query(query)
        }).then(result => {
            let results = isHeadlines ?
                new apiParser(result).applyImagePath() :
                result;
            res.send(results);
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