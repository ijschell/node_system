// server modules
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var flash = require('connect-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var secret_token = require('./server/secret_token.js');
var passport = require('passport'),LocalStrategy = require('passport-local').Strategy;

// middelwares config
app.use(cookieParser());
app.use(session({
    secret: secret_token.secret_token,
    resave: false,
    saveUninitialized: false
}));
app.use(flash());
passport.use(new LocalStrategy(

  function(username, password, done) {

    User.findOne({ username: username }, function (err, user) {

      if (err) { return done(err); }

      if (!user) {

        return done(null, false, { message: 'Incorrect username.' });

      }

      if (!user.validPassword(password)) {

        return done(null, false, { message: 'Incorrect password.' });

      }
      console.log(user);
      return done(null, user);

    });
  }
));


// paths
var client = __dirname + '/public/client';
var admin = __dirname + '/public/admin';


// extra modules
var routes = require('./server/routes.js');
var save = require('./server/saves.js');
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, admin + '/files/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
var upload = multer({
    storage : storage,
    limits : { fileSize : '4mb' }
});


// settings
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


// routes
// gets
app.get('*', function(req, res){

    switch (req.path) {
        case '/admin/':
            routes.routes('/admin/', res, admin);
        break;
        case '/admin/sections':
            routes.routes('/admin/sections', res, admin);
        break;
        case '/admin/contact':
            routes.routes('/admin/contact', res, admin);
        break;
        case '/admin/perfil':
            routes.routes('/admin/perfil', res, admin);
        break;
        case '/admin/login':
            routes.routes('/admin/login', res, admin);
        break;
        // default:
        //     routes.routes(req.url, res, client);
    }

})


// save config
app.post('/admin', upload.array('image', 12), function(req, res){

    save.getSave(req.body, res, admin);

})


// save sections and delete
app.post('/admin/sections', upload.array('image', 12), function(req, res){

    // if has image?
    if(req.files != undefined){

        var data = {
            body : req.body,
            image : req.files,
            section : req.body.section
        }
        save.getSave(data, res, admin);

    }else {

        save.getSave(req.body, res, admin);

    }

})

//save contact data
app.post('/admin/contact', upload.array('image', 12), function(req, res){

    save.getSave(req.body, res, admin);

})

//save perfil data
app.post('/admin/perfil', upload.array('image', 12), function(req, res){

    save.getSave(req.body, res, admin);

})

//Login
app.post('/admin/login',  passport.authenticate('local', {

    successRedirect : '/admin',
    failureRedirect : '/admin/login',
    failureFlash : 'Invalid username or password'

}))


// listen sever
app.listen('3000', function(){
    console.log('Server run in http://localhost:3000');
})
