// server modules
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var auth = require('./server/auth.js');
var cookieParser = require('cookie-parser');
var cliente = require('./server/client_info.js');

// paths
var client = __dirname + '/public/client';
var admin = __dirname + '/public/admin';


// extra modules
var routes = require('./server/routes.js');
var save = require('./server/saves.js');
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, admin + '/files/')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})
var upload = multer({
    storage: storage,
    limits: {
        fileSize: '4mb'
    }
});


// settings
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieParser());

// routes
// gets
app.get('/admin', function(req, res) {
    res.redirect('/admin/home');
})

app.get('/admin/*', function(req, res) {

    if (req.cookies.Authorization != undefined) {

        auth.checkAuth(req.cookies.Authorization, res, admin, function(data) {

            if (data == true) {

                // filter admin or client
                switch (req.path) {
                    case '/admin/home':
                        routes.routes('/admin/home', res, admin);
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
                    case '/admin/logout':
                        res.clearCookie('Authorization');
                        routes.routes('/admin/login', res, admin);
                        break;
                        // default:
                        //     routes.routes(req.url, res, client);
                }

            } else {

                routes.routes('/admin/login', res, admin, 'No puede acceder');

            }

        })

    } else {

        routes.routes('/admin/login', res, admin, 'No puede acceder');

    }

})


// save config
app.post('/admin/home', upload.array('image', 12), function(req, res) {

    save.getSave(req.body, res, admin);

})


// save sections and delete
app.post('/admin/sections', upload.array('image', 12), function(req, res) {

    // if has image?
    if (req.files != undefined) {

        var data = {
            body: req.body,
            image: req.files,
            section: req.body.section
        }
        save.getSave(data, res, admin);

    } else {

        save.getSave(req.body, res, admin);

    }

})

//save contact data
app.post('/admin/contact', upload.array('image', 12), function(req, res) {

    save.getSave(req.body, res, admin);

})

//save perfil data
app.post('/admin/perfil', upload.array('image', 12), function(req, res) {

    save.getSave(req.body, res, admin);

})

//Login
app.post('/admin/login', upload.array('image', 12), function(req, res) {

    auth.login(req.body, res, admin);

})





// CLIENT SIDE

// home
app.get('/', function(req, res){

    res.render(client + '/views/home');

})

app.post('/home_data', function(req, res){

    // preparo datos para home
    var json = {
        info : {
            config : '',
            sections : '',
            contact : ''
        }
    };

    cliente.getInformation('sections', function(data){

        // set sections
        json.info.sections = data;

        cliente.getInformation('config', function(data){

            // set config
            json.info.config = data[0];

            cliente.getInformation('contact', function(data){

                // set contact data
                json.info.contact = data[0];

                res.json(json);

            });

        });

    });

})



// listen sever
app.listen('3000', function() {
    console.log('Server run in http://localhost:3000');
})
