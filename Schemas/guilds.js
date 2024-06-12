const mongoose = require('mongoose')
const guild = new mongoose.Schema({
    _id: {type: String, required: true},
    prefix: {type: String, default: 'h.'},
    giveaway: { type: Map, of: Object, default: {} },
    welcome: {type: String, default: 'false'},
    welcomeMessage: {type: String, required: false},
    leaveMessage: {type: String, required: false},
    logs: {type: Boolean, default: false},
    role: { 
        r: { type: Boolean, default: false},
        id:{ type: String }
    },
    channel: {type: String, required: false},
    channelLogs: {type: String, required: false},
    antilink: {type: Boolean, required: false, default: false},
})
module.exports = mongoose.model("Guilds", guild)