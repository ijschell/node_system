// server modules
var express = require('express');
var app = express();


// extra modules
var database = require('./database.js');


exports.getSave = function(req){
    switch (req.section) {
        case 'config':
            database.insert("UPDATE config SET title = '"+req.title+"', description = '"+req.description+"', keywords = '"+req.keywords+"' WHERE id = '1'", function(data){
                console.log('Update!');
            });
        break;
        default:

    }
    console.log(req);
}
