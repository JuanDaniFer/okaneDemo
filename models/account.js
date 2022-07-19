const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = mongoose.model('Account', accountSchema)