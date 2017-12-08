// server modules
var http = require('http');
var express = require('express');
var app = express();


// extra modules
var database = require('./server/database.js');


// paths
var client = __dirname + '/public/client';
var admin = __dirname + '/public/admin';


// settings
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


// get config
database.select("SELECT * FROM config", function(data){
    // get config from database
    app.set('config', data[0]);
    app.set('author', 'Jonathan Schell');
})


app.get('/', function(req, res){

    res.render(client + '/views/home', {
        config : app.get('config'),
        author : app.get('author')
    });

})


app.listen('3000', function(){
    console.log('Server run in http://localhost:3000');
})
