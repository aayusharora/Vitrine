/**
 * Created by aayusharora on 6/25/17.
 */
/*jslint node: true */


    var express = require('express');
    var request = require('request');
    var bodyParser = require('body-parser');
    var app = express();
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/Vitrine';
    var mongo = require('./mongoDB');
    var bitballoon = require('./bitballon');

    var apiUrl = 'https://www.bitballoon.com/api/v1/sites?access_token=';


app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/',express.static('public'));

    app.get('/upload', function (req,res) {
        res.send("Upload your files");
    });

    app.post('/getData',function(req,res) {

        MongoClient.connect(url, function(err, db) {

            var obj = {
                batch_id: req.body.batch_id,
                access_token: req.body.access_token
            };

            mongo.insertObj(db,obj, function(data){

                request(apiUrl + obj.access_token, function(error, response, body) {
                    console.log(apiUrl + obj.access_token);
                    console.log("hello");
                    for(var i=0; i< JSON.parse(body).length ; i++ ) {
                        console.log((JSON.parse(body))[i].url);
                    }

                });


                // bitballoon.reqURL(apiUrl + obj.access_token);
                // console.log(data);
            });

            mongo.findDocuments(db, obj,function(data) {
               // console.log(data);
                db.close();
            });
        });
            res.send("Success");
        });


    app.listen('8081');
    console.log('Magic happens at 8081');

