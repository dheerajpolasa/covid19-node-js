const express = require('express');
const bodyParser = require('body-parser');
const patientsController = require('../controllers/patients_controller');
const router = express.Router();
const passport = require('passport');

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route for rendering the register page
router.get('/register', passport.checkAuthentication, patientsController.register);

// Route for creating patient
router.post('/create', passport.checkAuthentication, patientsController.createAndGet);

// Route for displaying patient
router.get('/:id', passport.checkAuthentication, patientsController.display);

// Route for creating report
router.post('/:id/create_report', passport.checkAuthentication, patientsController.createReport);

// Route for getting all reports
router.get('/:id/all_reports', passport.checkAuthentication, patientsController.getAllReports);

module.exports = router;
