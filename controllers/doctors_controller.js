const Doctor = require('../models/doctor');

// Renders the sign in page
module.exports.signIn = function(req, res) {
    try {
        if(req.isAuthenticated()) {
            return res.redirect('/doctors/profile');
        }
        return res.render('sign-in');
    } catch(err) {
        console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Renders the sign up page
module.exports.signUp = function(req, res) {
    try {
        if(req.isAuthenticated()) {
            return res.redirect('/doctors/profile');
        }
        return res.render('sign-up')
    } catch(err) {
        console.log('Error', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Creates the user session
module.exports.createSession = function(req, res) {
    req.flash('success', 'Logged In Successfully')
    return res.redirect('/doctors/profile');
}

// Create the new Doctor
module.exports.createDoctor = async function(req, res) {
    try {
        console.log(req.body);
        if(req.body.password != req.body['confirm-password']) {
            req.flash('error', 'Passwords should be same');
            return res.redirect('back');
        }
        let doctor = await Doctor.findOne({username: req.body.username});
        console.log(doctor);
        if(doctor !== null) {
            req.flash('error', 'User is already present');
            return res.redirect('back');
        }
        req.flash('success', 'Doctor profile is cretaed');
        await Doctor.create(req.body);
        return res.redirect('/doctors/login');
    } catch(err) {
        console.log('Error in creating user', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Renders the profile page of the doctor
module.exports.profile = function(req, res) {
    return res.render('profile');
}

// Destroys the user session
module.exports.destroySession = function(req, res) {
    req.flash('success', 'Logged out successfully');
    req.logout();
    return res.redirect('/');
}