const Patient = require('../models/patient');
const Report = require('../models/report')
// Renders the registers the page of patient
module.exports.register = function(req, res) {
    try {
        return res.render('patient-register');
    } catch(err) {
        req.flash('error', err);
        console.log('Error in retrieving the register page', err);
        return;
    }
}

// Creates the Patient, if already created, returns the object
module.exports.createAndGet = async function(req, res) {
    try {
        let patient = await Patient.findOne({phoneNumber: parseInt(req.body.phoneNumber)});
        let flag = true;
        if(patient === null) {
            flag = false;
            patient = await Patient.create({name: req.body.name, phoneNumber: parseInt(req.body.phoneNumber)});
        }
        if(flag) req.flash('success', 'Patient Record is created');
        else req.flash('success', 'Patient is fetched from DB')
        return res.render('patient', {
            patient: patient
        })
    } catch(err) {
        console.log('Error in creating/finding the patient', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}

// Creates the patient report
module.exports.createReport = async function(req, res) {
    try {
        let report = await Report.create({
            name: req.body.name,
            doctor: req.body['doctor-name'],
            status: req.body.status,
            date: new Date()
        });
        let patient = await Patient.findById(req.params.id);
        patient.reports.push(report);
        patient.save();
        req.flash('success', 'Report is created');
        return res.render('patient', {
            patient: patient
        })
    } catch(err) {
        console.log('Error in creating the report', err);
        return res.redirect('back');
    }
}

// Get all reports of a particular patient
module.exports.getAllReports = async function(req, res) {
    try {
        let patient = await Patient.findById(req.params.id).populate('reports').sort('-reports.date').exec();
        patient.reports.sort(function(x, y) {
            return y.updatedAt - x.updatedAt;
        });
        return res.render('reports', {
            patient: patient
        })
    } catch(err) {
        console.log('Error in fetching the reports', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}