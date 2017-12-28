var LocaStategy = require('passport-local').Strategy;

module.exports = function(passport){

    passport.serializeUser(function(user, done){

        done(null, user);

    });

    passport.deserializeUser(function(obj, done){

        done(null, obj);

    });

    passport.use(new LocaStategy({

        passReqToCallback : true

    }, function(req, user, pass, done){
        
        console.log(user);

        return;

    }
    ));

}
