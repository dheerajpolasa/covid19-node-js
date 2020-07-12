const express = require('express');
const bodyParser = require('body-parser');
const reportsController = require('../controllers/reports_controller');
const router = express.Router();
const passport = require('passport');

router.use(express.urlencoded({ extended: true }));
router.use(bodyParser.json());

// Route for rendering filter page
router.get('/filter', passport.checkAuthentication, reportsController.filter);

// Router for filtering records
router.post('/:status', passport.checkAuthentication, reportsController.fetchByStatus);

module.exports = router;