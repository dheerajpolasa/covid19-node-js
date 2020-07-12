const mongoose = require('mongoose');

const reportSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    date: Date
}, {
    timestamps: true
});


const Report = mongoose.model('Report', reportSchema);

module.exports = Report;