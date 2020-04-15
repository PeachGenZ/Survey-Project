const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const analyseSchema = new Schema({
    answerId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    surveyId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    }, 
    preProcess: Array,
    result: Array,
    linkertScale: Array,
    amountAnswer: Number,
});

const Analyse = mongoose.model('Analyse', analyseSchema);

module.exports = Analyse;