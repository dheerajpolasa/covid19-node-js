const express = require('express');
const bodyParser = require('body-parser');
const doctorsController = require('../controllers/doctors_controller');
const router = express.Router();
const passport = require('passport');

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route to register the new doctor
router.get('/register', doctorsController.signUp);

// Route to login the doctor
router.get('/login', doctorsController.signIn);

// Route to create a new doctor
router.post('/create-doctor', doctorsController.createDoctor);

// Route to create a sesssion for doctor
router.post('/create-session', passport.authenticate('local',  {failureRedirect: '/doctors/login'}), doctorsController.createSession);

// Route to display the profile page
router.get('/profile', passport.checkAuthentication, doctorsController.profile)

// Route to logout the user session
router.get('/destroy', doctorsController.destroySession);

module.exports = router;