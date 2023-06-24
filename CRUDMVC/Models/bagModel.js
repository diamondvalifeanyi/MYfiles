const mongoose = require('mongoose');
const schema = mongoose.Schema

const bagSchema = new mongoose.Schema({
    brandName: {
        type: String,
    },
    color: {
        type: String,
    },
    price: {
        type: Number
    }
})

const bagModel = mongoose.model('bagModel', bagSchema)
module.exports = bagModel;