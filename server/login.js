// extra modules
var database = require('./database.js');
var routes = require('./routes.js');
var md5 = require('md5');
var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
app.use(express.cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

exports.checkLogin = function(req, res, admin){

    // get admin
    database.select("SELECT * FROM perfil", function(data){

        var user = req.username;
        var pass = md5(req.password);

        if(data[0].user == user && data[0].pass == pass){

            // logged!
            res.cookie('session' , 'logged!').send('Cookie is set');
            console.log('listo!');
            res.redirect('/admin');

        }else {

            // incorrect
            console.log('incorrect!');

        }

    })

}
