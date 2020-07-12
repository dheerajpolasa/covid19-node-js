const express = require('express');
const bodyParser = require('body-parser');
const homeController = require('../controllers/home_controller');
const router = express.Router();
const passport = require('passport');

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route for home page of the website
router.get('/', homeController.home);

// Route that handles all the requests related to doctors
router.use('/doctors', require('./doctors'));

// Route that handles all the requests related to patients
router.use('/patients', require('./patients'));

// Route that handles all the requests related to
router.use('/reports', require('./reports'));

module.exports = router;