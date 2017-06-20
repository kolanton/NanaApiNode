//db config
const dbConfig = require("./dbConfig.json");
const sql = require('mssql');
const apiParser = require('./apiParser');
const mongoose = require('mongoose');
const Talkback = require('./models/talkback')


class mongoManager {
    static runSqlPromise(props) {
        sql.connect(dbConfig).then(pool => {
            return pool.request()
                .query(props.query)
        }).then(result => {
            let results = props.parserCallback(result);
            let tb = new Talkback(); 
            results.forEach(function(element) {
                let talkback = new tb.talkback(element); 
                talkback.save();       
            }, this);                
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

    static getFromMongoDb(res, req, isHeadlines = false) {
        let tb = new Talkback(); 
        let talkback = tb.talkback.find({},(err, post)=>{
             res.send(post);
        });
    }       
    static putToMongoDb(res, req){
         console.log("putToMongoDb");
            // let results = props.parserCallback(result);

            let tb = new Talkback(); 
            console.log("request.body",req.body);
            let data = {MessageBody:req.body.text,PublishDate:new Date()}
            let talkback = new tb.talkback(data); 
            try {
                console.log("start saving data");
                talkback.save();
                res.send({
                status:'ok',
                response: talkback.PublishDate
               }); 
            } catch (error) {
                console.log("save error:",error);
                res.send({
                status:error,
               }); 
            }
    }
}

module.exports = mongoManager;