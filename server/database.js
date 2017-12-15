var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "node_system"
});

var actionDatabase = function(callback){
      callback();
}

exports.insert = function(sql, callback){
    actionDatabase(function(){
        con.query(sql, function (err, result) {
            if (err) throw err;
            callback();
        });
    })
}

exports.select = function(sql, callback){
    actionDatabase(function(){
        con.query(sql, function (err, result, fields) {
        if (err) throw err;
            callback(result);
        });
    });
}

exports.delete = function(sql, callback){
    actionDatabase(function(){
        con.query(sql, function (err, result) {
            if (err) throw err;
            callback(result);
        });
    });
}
