// server modules
var express = require('express');
var app = express();


// extra modules
var database = require('./database.js');


// get config
refreshConfig();

function refreshConfig(){

    database.select("SELECT * FROM config", function(data){
        // get config from database
        app.set('config', data[0]);
        app.set('author', 'Jonathan Schell');
    })

}

var adminName = '';

database.select("SELECT * FROM contact", function(data){

    adminName = data[0].name;

})


exports.routes = function(req, res, path, message){

    // refresh config
    refreshConfig();

    switch (req) {

        // admin paths
        case '/admin/home':
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
        case '/admin/login':
            adminLogin(res, path, message);
        break;

    }

}


function adminHome(res, path){
    console.log('Admin Home');

    res.render(path + '/views/home', {
        config : app.get('config'),
        author : app.get('author'),
        admin_name : adminName,
        page : 'home'
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
            sections : sections,
            admin_name : adminName,
            page : 'sections'
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
            contact_data : contactData,
            admin_name : adminName,
            page : 'contact'
        });
    })
}


function adminPerfil(res, path){
    console.log('Admin Perfil');

    res.render(path + '/views/perfil', {
        config : app.get('config'),
        author : app.get('author'),
        admin_name : adminName,
        page : 'perfil',
        message : res.message
    });

}


function adminLogin(res, path, message){
    console.log('Admin Login');

    res.render(path + '/views/login', {
        config : app.get('config'),
        author : app.get('author'),
        message : message
    });

}
