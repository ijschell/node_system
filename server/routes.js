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
        case '/admin/sections':
            adminSections(res, path);
        break;
        case '/admin/contact':
            adminContact(res, path);
        break;
        case '/admin/perfil':
            adminPerfil(res, path);
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
        config : app.get('config'),
        author : app.get('author')
    });
}


function adminSections(res, path){
    console.log('Admin Sections');
    var sections;
    // get sections saves
    database.select("SELECT * FROM sections", function(data){
        // get config from database
        sections = data;
        res.render(path + '/views/sections', {
            config : app.get('config'),
            author : app.get('author'),
            sections : sections
        });
    })
}


function adminContact(res, path){
    console.log('Admin Contact');
    var contactData;
    // get contact data
    database.select("SELECT * FROM contact", function(data){
        // get config from database
        contactData = data;
        res.render(path + '/views/contact', {
            config : app.get('config'),
            author : app.get('author'),
            contact_data : contactData
        });
    })
}


function adminPerfil(res, path){
    console.log('Admin Perfil');

    res.render(path + '/views/perfil', {
        config : app.get('config'),
        author : app.get('author')
    });

}
