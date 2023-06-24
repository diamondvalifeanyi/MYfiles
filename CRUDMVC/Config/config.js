require('dotenv').config();
const mongoose = require('mongoose');
// PORT = process.env.PORT || 5555
DB = process.env.DATABASE

// const dbpassword = process.env.password
// const dbuser = process.env.username

//const DB = `mongodb+srv://${dbuser}:${dbpassword}@cluster0.ctr5lvp.mongodb.net`
mongoose.connect(DB).then(()=> {
    console.log("connected to database")
}).catch (()=> {
    console.log("error connecting to database")
})