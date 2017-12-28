var jwt = require('jwt-simple');
var moment = require('moment');
var secret = require('./secret_token.js');
var database = require('./database.js');


exports.ensureAuthenticated = function(req, res) {
  if(!req.headers.authorization) {
    return res
      .status(403)
      .send({message: "Tu petición no tiene cabecera de autorización"});
  }

  var token = req.headers.authorization.split(" ")[1];
  var payload = jwt.decode(token, secret.secret_token);

  if(payload.exp <= moment().unix()) {
     return res
     	.status(401)
        .send({message: "El token ha expirado"});
  }

  req.user = payload.sub[0].user;

  database.select("SELECT user FROM perfil", function(data){

      if(req.user == data[0].user){

          console.log('Loged!');

      }else {

        console.log('un authorized!');
        
      }

  })

  // next();
}
