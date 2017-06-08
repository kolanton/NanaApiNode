const mongoose = require('mongoose');


class Talkback {
    constructor() {      
        this.mongoose = mongoose.connect('mongodb://localhost/talkback');
        let Schema = mongoose.Schema,
            ObjectId = Schema.ObjectId;
        let talkback = new Schema({
            ArticleID: {
                type: ObjectId
            },
            asRootID: {
                type: Number
            },
            MessageID: {
                type: Number
            },
            PublishDate: {
                type: Date
            },
            ParentID: {
                type: Number
            },
            Depth: {
                type: Number
            },
            Hierarchy: {
                type: String
            },
            Status: {
                type: Number
            },
            MessageBody: {
                type: String
            }
        });
         let collection = mongoose.model('tb', talkback);
         let model = new collection();        
                      //  let tb = new Talkback().model;              
                
                model.push({
                ArticleID: 428277,
                asRootID: 10214018,
                MessageID: 10214018,
                PublishDate: "2007-02-15T18:02:00.000Z",
                ParentID: 0,
                Depth: 1,
                Hierarchy: "10214018",
                Status: 1,
                MessageBody: "dsadsadsa"
                });
        model.save((err)=>{console.log('model.save error',err);})

    }

}
module.exports = Talkback;