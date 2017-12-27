// server modules
var express = require('express');
var app = express();
var fs = require('fs');
var md5 = require('md5');


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

            var image;

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
        case 'sections-edit':

            // delete old image
            if(req.body.old_image.length > 0){
                fs.unlink(path + '/files/' + req.body.old_image, function(err){
                    if(err) return console.log(err);
                });
            }

            // Edit to new image
            var image;

            if(req.image.length > 0){
                image = req.image[0].originalname;
            }else {
                image = '';
            }

            database.update("UPDATE sections SET image = '"+image+"', title = '"+req.body.title+"', description = '"+req.body.description+"' WHERE id = '"+req.body.id+"'", function(data){
                console.log('Sección editada!');
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
        case 'contact':

            database.update("UPDATE contact SET name = '"+req.name+"', phone = '"+req.phone+"', mail = '"+req.mail+"' WHERE 1", function(data){
                console.log('Contacto actualizado!');
                routes.routes('/admin/contact', res, path);
            });

        break;
        case 'perfil':

            database.update("UPDATE perfil SET pass = '"+md5(req.pass_confirmation)+"' WHERE 1", function(data){
                console.log('Perfil actualizado!');
                routes.routes('/admin/perfil', res, path);
            });

        break;
        default:

    }
}
