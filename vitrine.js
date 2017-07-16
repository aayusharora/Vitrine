/**
 * Created by aayusharora on 6/25/17.
 */
/*jslint node: true */


    var express = require('express');
    var request = require('request');
    var bodyParser = require('body-parser');
    var app = express();
    var mongo = require('./mongoDB');


    var person = [];

app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use('/',express.static('public'));

    app.get('/upload', function (req,res) {
        res.send("Upload your files");
    });

    app.post('/getData',function(req,res) {


    });

    mongo.dbConnect(function(){
        app.listen('8081',function(){
            console.log("Server is listening to port 8081")
        });

    });



