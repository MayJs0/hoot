const mongoose = require('mongoose');
const user = new mongoose.Schema({
    _id: {type: String, required: true},
    language: {type: String, default: 'br'},
})
module.exports = mongoose.model('Users', user)