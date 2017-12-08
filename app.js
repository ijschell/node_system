// server modules
var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


// extra modules
var routes = require('./server/routes.js');
var save = require('./server/saves.js');


// paths
var client = __dirname + '/public/client';
var admin = __dirname + '/public/admin';


// settings
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));


// routes
// gets
app.get('*', function(req, res){

    // filter admin or client
    switch (req.url) {
        case '/admin/':
            routes.routes(req.url, res, admin);
        break;
        default:
            routes.routes(req.url, res, client);
    }

})

// posts
app.post('/admin/save', function(req, res){

    save.getSave(req.body);

})


// listen sever
app.listen('3000', function(){
    console.log('Server run in http://localhost:3000');
})
