const mongoose = require('mongoose')

const RequestSchema = new mongoose.Schema({
    endpoint: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: false
    },
    isbn: {
        type: String,
        required: false
    }
})

const Request = mongoose.model('Request', RequestSchema)

module.exports = Request