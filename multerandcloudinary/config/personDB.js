require('dotenv').config();
const mongoose = require('mongoose');

const url = 'mongodb+srv://diamondvalifeanyi001:lGeP0b24Z5WnYWDD@cluster0.ctr5lvp.mongodb.net/CloudinaryDatabase';
mongoose.connect(url).then(()=>{
    console.log('Database connected successfully');
}).catch((error)=>{
    console.log(error.message)
})