// extra modules
var database = require('./database.js');
var routes = require('./routes.js');
var md5 = require('md5');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended:true}));

exports.checkLogin = function(req, res, admin, callback){

    // get admin
    database.select("SELECT * FROM perfil", function(data){

        var user = req.body.username;
        var pass = md5(req.body.password);

        if(data[0].user == user && data[0].pass == pass){

            // logged!
            console.log('listo!');
            callback();

        }else {

            // incorrect
            console.log('incorrect!');

        }

    })

}
