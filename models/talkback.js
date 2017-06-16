const mongoose = require('mongoose');
// var uri = "mongodb://kay:myRealPassword@mycluster0-shard-00-00-wpeiv.mongodb.net:27017,mycluster0-shard-00-01-wpeiv.mongodb.net:27017,mycluster0-shard-00-02-wpeiv.mongodb.net:27017/admin?ssl=true&replicaSet=Mycluster0-shard-0&authSource=admin";
// MongoClient.connect(uri, function(err, db) {
//   db.close();
// });
class Talkback {
    constructor() {
        // let db = mongoose.connect('mongodb://localhost/talkback');
        let db = mongoose.connect('mongodb://marks:6HjjTPsVrB3RUGjn@cluster0-shard-00-00-iqv7y.mongodb.net:27017,cluster0-shard-00-01-iqv7y.mongodb.net:27017,cluster0-shard-00-02-iqv7y.mongodb.net:27017/talkback?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin');
        
        let Schema = mongoose.Schema,
            ObjectId = Schema.ObjectId;
        let talkback = new Schema({
            ArticleID: Number,
            asRootID: Number,
            MessageID: Number,
            PublishDate: Date,
            ParentID: Number,
            Depth: Number,
            Hierarchy: String,
            Status: Number,
            MessageBody: String
        });     
            talkback.pre('find',(next)=>{
            console.log('----------find request--------');
            next();
            });   
        this.talkback = mongoose.models.talkback || db.model('talkback', talkback);  
 
        }
}
module.exports = Talkback;