const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userResultSchema = new Schema({
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
    setResult: Array,
    userResult: Array,
});

const userResult = mongoose.model('UserResult', userResultSchema);

module.exports = userResult;