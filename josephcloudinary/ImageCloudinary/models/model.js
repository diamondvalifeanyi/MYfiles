const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    message: {
        type: String,
        required: [true, 'Message is required']
    },
    profilePicture: {
       public_id: {type: String},
       url: {type: String}
    }
})

const contactModel = mongoose.model('Book', contactSchema)

module.exports = contactModel