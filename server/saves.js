// server modules
var express = require('express');
var app = express();
var fs = require('fs');


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

            let image;

            if(req.image.length > 0){
                image = req.image[0].originalname;
            }else {
                image = '';
            }

            database.insert("INSERT INTO sections (title, description, image) VALUES ('"+req.body.title+"', '"+req.body.description+"', '"+image+"')", function(data){
                console.log('Nueva sección creada!');
                routes.routes('/admin/sections', res, path);
            });

        break;
        case 'del':

            database.insert("DELETE FROM sections WHERE id = '"+req.target+"'", function(data){

                // delete Imagen
                if(req.image.length > 0){
                    fs.unlink(path + '/files/' + req.image, function(err){
                        if(err) return console.log(err);
                        console.log('Se eliminó '+req.target+' sección!');
                    });
                }

                res.delete = true;
                routes.routes('/admin/sections', res, path);

            });
        break;
        default:

    }
}
