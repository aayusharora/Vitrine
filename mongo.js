    /**
     * Created by aayusharora on 7/11/17.
     */

    var mongodb = require('mongodb');
    var request = require('request');
    var apiUrl = 'https://www.bitballoon.com/api/v1/sites?access_token=';
    var url = 'mongodb://localhost:27017/show';
    var database = "";
    var passport = require('passport');

    var showcaseArray = [];
    var dbConnect = function(start_server) {

        mongodb.MongoClient.connect(url, function(err,db){

            database = db;
            console.log(db);
            console.log("Connected to main server");
            start_server();
        });
    };

    var httpRequest = function(url,callback) {

        request(url, function(err, response, data) {
           callback(data);
        });

    };

    var httpObj = function(access_token,callback) {

        // By the access token:
        // Asking the user and get it's username from bitballoon and ask him to enter password if access_token is valid.
        // Storing Access_token, username and password
        // Using passport.js


        httpRequest(apiUrl + access_token, function(data) {
            // var user = {
            //     username: JSON.parse(data)[0].account_slug,
            //     access_token: obj.access_token,
            // }
            // database.collection(obj.batch_id).insertOne(, function(err, result) {
            //
            // });
            callback(data);

        });

    };


    var insertObj = function (obj, callback) {

      console.log("Going to insert in DB");
      // console.log(database);
      var collection = database.collection('VitrineTable');
      collection.insertOne(obj,function(err, data) {

          collection.find({}).toArray(function(err, docs) {

              callback(docs);
          });

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

    var showcase = function(callback) {
        var collection = database.collection('VitrineTable');
        collection.find({}).toArray(function(err, docs) {
            showcaseArray = [];
            for(var i=0; i< docs.length ; i++) {
                showcaseArray.push(docs[i].username);
            }

            callback(showcaseArray);
        });
    };

    function checkUser(username, password,callback) {

        database.collection('VitrineTable').findOne({ username: username }, function (err, user) {

            if (err) { callback(err); }
            else if (!user) {
                console.log("Enter valid username");
                callback(false);
            }

            else if ( password !== user.password ) {
                console.log("Enter valid password");
                callback(false);
            }

            else {
                console.log("Things are fine.");
                callback(user);

            }
        });
    }

    module.exports = {
      dbConnect: dbConnect,
      httpObj: httpObj,
      insertObj: insertObj,
      findDocuments: findDocuments,
      checkUser: checkUser,
      showcase: showcase
    };