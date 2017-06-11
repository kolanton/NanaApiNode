const mongoose = require('mongoose');

class Talkback {
    constructor() {
        let db = mongoose.connect('mongodb://localhost');
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
        this.talkback = mongoose.models.talkback || db.model('talkback', talkback);        
    }
}
module.exports = Talkback;