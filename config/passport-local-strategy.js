const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/doctor');
// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'username',
    passReqToCallback: true
    },
    function(req, username, password, done) {
        // find the user and establish the identity
        User.findOne({username: username})
        .then((user) => {
            // console.log(user);
            if (!user) {
                req.flash('error', 'Username/Password is wrong');
                return done(null, false, { message: 'That email is not registered' });
            }
            
            // comparese the password with the db password
            if(user.password != password) {
                return done(null, false, {message: 'Password Incorrect'});
            }

            return done(null, user);
        }).catch((err) => {
            req.flash('error', err);    
            return done(err);
        })
    }
));

// serialize the user to decide which key is to be kept in cookies
passport.serializeUser(function(user, done) {
    console.log(user.id);
    done(null, user.id);
});

// deserialize the user from key in the cookies
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        if(err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }
        console.log('Retrieved User');
        return done(null, user);
    });
});

// Check if user is authenticated
passport.checkAuthentication = function(req, res, next) {
    // If the user is signed in, then pass the request to the controller
    if(req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/');
}

passport.setAuthenticatedUser = function(req, res, next) {
    if(req.isAuthenticated()) {
        console.log('Is Authenticated');
        res.locals.user = req.user;
        // console.log('Is Authenticated');
    }
    next();   
}

module.exports = passport;