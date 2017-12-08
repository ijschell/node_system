// server modules
var express = require('express');
var app = express();


// extra modules
var database = require('./database.js');


// get config
database.select("SELECT * FROM config", function(data){
    // get config from database
    app.set('config', data[0]);
    app.set('author', 'Jonathan Schell');
})


exports.routes = function(req, res, path){

    switch (req) {
        // client paths
        case '/':
            clientHome(res, path);
        break;


        // admin paths
        case '/admin/':
            adminHome(res, path);
        break;

    }

}


function clientHome(res, path){
    console.log('Client Home');
    res.render(path + '/views/home', {
        config : app.get('config'),
        author : app.get('author')
    });
}


function adminHome(res, path){
    console.log('Admin Home');
    res.render(path + '/views/home', {
        admin : 'soy admin'
    });
}
