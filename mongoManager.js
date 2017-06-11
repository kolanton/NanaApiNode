//db config
const dbConfig = require("./dbConfig.json");
const sql = require('mssql');
const apiParser = require('./apiParser');
const mongoose = require('mongoose');
const Talkback = require('./models/talkback')


class mongoManager {

    static runSqlPromise(res, req, query, isHeadlines = false) {
        sql.connect(dbConfig).then(pool => {
            return pool.request()
                .query(query)
        }).then(result => {
            let results = isHeadlines ?
                new apiParser(result).applyImagePath() :
                result;
            let tb = new Talkback(); 
            results.forEach(function(element) {
                let talkback = new tb.talkback(element); 
                talkback.save();       
            }, this);                
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

module.exports = mongoManager;