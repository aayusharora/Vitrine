/**
 * Created by aayusharora on 7/11/17.
 */


var insertObj = function(db,obj,callback) {
    //
    // console.log(db);
    // console.log(object);
    // console.log(callback);
    // Get the documents collection
    // console.log(db);
    var collection = db.collection(obj.batch_id);
    // Insert some documents
    collection.insertMany([obj], function(err, result) {
        console.log("Inserted  document into the collection");
        callback(result);
    });
};

var findDocuments = function(db, obj ,callback) {
    // Get the documents collection
    var collection = db.collection(obj.batch_id);
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs);
        callback(docs);
    });
};

module.exports = {
  insertObj: insertObj,
  findDocuments: findDocuments
};