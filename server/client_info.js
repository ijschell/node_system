// server modules
var express = require('express');
var app = express();

// extra modules
var database = require('./database.js');


// extra modules
var database = require('./database.js');

exports.getInformation = function(path, callback){

    if (path == 'config') {

        // get config
        database.select("SELECT * FROM config", function(data){

            callback(data);

        });

    }

    if(path == 'sections'){

        // get sections
        database.select("SELECT * FROM sections", function(data){

            callback(data);

        });

    }

    if(path == 'contact'){

        // get sections
        database.select("SELECT * FROM contact", function(data){

            callback(data);

        });

    }

}
