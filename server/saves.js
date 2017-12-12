// server modules
var express = require('express');
var app = express();


// extra modules
var database = require('./database.js');
var routes = require('./routes.js');


exports.getSave = function(req, res, path){
    switch (req.section) {
        case 'config':
            database.insert("UPDATE config SET title = '"+req.title+"', description = '"+req.description+"', keywords = '"+req.keywords+"' WHERE id = '1'", function(data){
                console.log('Update!');
                routes.routes('/admin/', res, path);
            });
        break;
        case 'sections-new':
            console.log(req);
            database.insert("INSERT INTO sections (title, description, image) VALUES ('"+req.body.title+"', '"+req.body.description+"', '"+req.image[0].originalname+"')", function(data){
                console.log('Nueva sección creada!');
                routes.routes('/admin/sections', res, path);
            });
        break;
        default:

    }
}
