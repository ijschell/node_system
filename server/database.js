var mysql = require('mysql');

var con = mysql.createPool({
    connectionLimit : 10,
    host: "localhost",
    user: "root",
    password: "",
    database: "node_system"
});

var actionDatabase = function(callback){
    // con.connect(function(err) {
    //   if (err) throw err;
      // connected!
      callback();
    // });
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
