var jwt = require('jwt-simple');
var database = require('./database.js');
var moment = require('moment');
var secret = require('./secret_token.js');
var md5 = require('md5');
var routes = require('./routes.js');


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

                res.token = data;

                routes.routes('/admin/', res, admin);
                
            });


        }else {
            console.log('error!')
        }

    })

}
