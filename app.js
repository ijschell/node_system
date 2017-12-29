// server modules
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer  = require('multer');
var auth = require('./server/auth.js');
var cookieParser = require('cookie-parser');

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
app.use(cookieParser());

// routes
// gets
app.get('*', function(req, res){

    auth.checkAuth(req.cookies.Authorization, res, admin, function(data){



    })

    // filter admin or client
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
app.post('/admin/login', upload.array('image', 12), function(req, res){

    auth.login(req.body, res, admin);

})


// get headers
app.post('/admin/auth', upload.array('image', 12), function(req, res){

    // console.log(req.headers)
    auth.login(req.body, res, admin);

})

// listen sever
app.listen('3000', function(){
    console.log('Server run in http://localhost:3000');
})
