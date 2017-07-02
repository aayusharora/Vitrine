/**
 * Created by aayusharora on 6/25/17.
 */

var express = require('express');
var fs = require('fs');
var app = express();


app.use(express.static('public'));

app.get('/', function(req, res){
    res.send('Are you ready for the showcase');
});

app.get('/upload', function (req,res) {
   res.send("Upload your files");

});


app.listen('8081');
console.log('Magic happen at 8081');

exports = module.exports = app;