const express = require('express');
const mongoose = require('mongoose');
PORT = 2004;

// create a database url
const databaseUrl = "mongodb://localhost/electionDB"

// create a database connection
mongoose.connect(databaseUrl).then(() =>{
    console.log(`connected successfully to the database: ${databaseUrl}`);
}).catch ((error) => {
    console.log(error.message)
})

// create applicationmodel
const electionSchema = mongoose.Schema({
    state: {type: String, required:[true,"state is required"], unique:[true,"state aleady used"]},
parties: Array,
result: Object,
isRigged: Boolean
});



// create schema model
const electionModel = mongoose.model("electionresult", electionSchema)

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('welcome to my election result api')
})

// create a new state data
app.post("/elections", async (req, res) => {
    try {
        const newEntry = await electionModel.create(req.body)
        if (newEntry){
            res.status(201).json({
                message: "successfully created a new entry",
                data: newEntry,
                size: electionModel.length
            })
        }else {
            res.status(400).json({
                message: "failed to create data"
            })
        }
        
    } catch (error) {
        res.status(400).json({
            message: (error.message)
        })
        
    }
})
















// listen to port
app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
})