var jwt = require('jwt-simple');
var database = require('./database.js');
var moment = require('moment');
var secret = require('./secret_token.js');
var md5 = require('md5');
var routes = require('./routes.js');
var express = require('express');
var url = require('url');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

var createToken = function(callback) {

    database.select("SELECT user FROM perfil", function(data){

        var payload = {
          sub: data,
          iat: moment().unix(),
          exp: moment().add(14, "days").unix(),
        };

        callback(jwt.encode(payload, secret.secret_token));

    })

};


// login and create token
exports.login = function(user, res, admin){

    database.select("SELECT * FROM perfil", function(data){

        if(user.user == data[0].user && md5(user.pass) == data[0].pass){

            createToken(function(data){


                // // res.setHeader('Authorization', 'Bearer ' + data)
                res.cookie('Authorization' , data).send('Authorization is set');

            });


        }else {
            console.log('error!')
        }

    })

}


//check user
exports.checkAuth = function(token, res, admin, callback){

    var decoded = jwt.decode(token, secret.secret_token, false, 'HS256');
    var userAuth = decoded.sub[0].user;

    database.select("SELECT user FROM perfil", function(data){

        if(userAuth == data[0].user){

            console.log('permitido con éxito')

        }else {

            console.log('token invalido')

        }

    })

}
