const mongoose = require('mongoose')

const linkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: (new Date()).valueOf().toString()
    },
    value: {
        type: Number,
        required: true,
        default: 0
    },
    account: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    }
})

module.exports = mongoose.model('Link', linkSchema)