const mongoose = require('mongoose');
const user = new mongoose.Schema({
    _id: {type: String, required: true},
})
module.exports = mongoose.model('Users', user)