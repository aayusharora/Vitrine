/**
 * Created by aayusharora on 7/11/17.
 */

var mongodb = require('mongodb');
var apiUrl = 'https://www.bitballoon.com/api/v1/sites?access_token=';
var database = "";

var dbConnect = function(start_server) {

    mongodb.MongoClient.connect(apiUrl, function(err,db){
        if (err) throw err;

        database = db;
        console.log("Connected to main server");
        start_server();
    });
};

var insertObj = function(obj,callback) {

    // Insert some documents
    database.collection(obj.batch_id).insertOne(obj, function(err, result) {
        console.log("Inserted  document into the collection");
        callback(result);
    });

};

var findDocuments = function(db, obj ,callback) {
    // Get the documents collection
    var collection = db.collection(obj.batch_id);
    console.log(obj);
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
        // console.log("Found the following records");
        // console.log(docs);
        callback(docs);
    });
};

module.exports = {
  dbConnect: dbConnect,
  insertObj: insertObj,
  findDocuments: findDocuments
};