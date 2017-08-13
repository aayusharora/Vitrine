/**
 * Created by aayusharora on 6/25/17.
 */
/*jslint node: true */


    var express = require('express');
    var request = require('request');
    var bodyParser = require('body-parser');
    var session = require('express-session');
    var passport = require('passport');
    var path = require('path');
    var app = express();
    var access_tokenArray = [];


    var LocalStrategy = require('passport-local').Strategy;
    var mongo = require('./mongo.js');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use('/',express.static('public') );
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(session({ secret: 'keyboardcat', resave: false, saveUninitialized: true}));
    app.use(passport.initialize());
    app.use(passport.session());


    passport.use(new LocalStrategy(
            function(username, password, done) {

                mongo.checkUser(username,password,function (user) {
                    // console.log(user);
                    if(user !== false) {
                        console.log(false);
                        return done(null,user.username);
                    }
                    else {
                        console.log(user);
                        return done(null,user);
                    }

                });


            }
        ));



    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });



    app.get('/upload', function (req,res) {
        console.log(req.user);
        if (req.user) {
            return res.redirect('/upload.html');
        }

        else {
            res.redirect('/');

        }
    });

app.get('/showcases', function (req,res) {

    mongo.showcase(function(showcaseArray){
       access_tokenArray.forEach(function(access_token) {
           mongo.httpObj(access_token,function(data){
              console.log(data);
           });
       } );

       res.send(showcaseArray);
    });

});

    app.post('/storeData',function(req,res) {
        var data = {
            username: req.body.username,
            batch_id : req.body.batch_id,
            access_token: req.body.access_token,
            password: req.body.password
        };

         mongo.insertObj(data, function(data) {
            res.send(data);
         });

    });

    app.post('/getData',function(req,res) {

        mongo.httpObj(req.body,function(data){
            access_tokenArray.push(data.access_token);
            res.send(ok);
        });
    });

    app.post('/login', passport.authenticate('local',

            {
                successRedirect: '/upload',
                failureRedirect: '/'
            }
        ));

    app.get('/logout', function (req, res){
        req.session.destroy(function (err) {
            res.redirect('/'); //Inside a callback… bulletproof!
        });
    });

    mongo.dbConnect(function(){
        app.listen('8081',function(){
            console.log("Server is listening to port 8081");

        });

    });



