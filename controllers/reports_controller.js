const Report = require('../models/report');

// Renders the filter page
module.exports.filter = function(req, res) {
    try {
        return res.render('report-filter');
    } catch(err) {
        console.log('Error in fetching the page', err);
        return res.redirect('back');
    }
}

// Fetches all the records by status
module.exports.fetchByStatus = async function(req, res) {
    try {
        console.log(req.params.status);
        let reports = await Report.find({status: req.params.status});
        reports.sort(function(x, y) {
            return y.updatedAt - x.updatedAt;
        })
        console.log(reports);
        return res.render('reports', {
            reports: reports
        })
    } catch(err) {
        console.log('Error in fetching the reports', err);
        req.flash('error', err);
        return res.redirect('back');
    }
}