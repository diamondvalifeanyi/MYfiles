const express = require('express');
const mongoose = require('mongoose');
const PORT = 4003

const databaseUrl = "mongodb://localhost/drill"

mongoose.connect( databaseUrl ).then( () => {
    console.log(`Successfully connected to the database: ${databaseUrl}`);
} ).catch( ( error ) => {
    console.log(error.message)
} )


const drillSchema = mongoose.Schema ({
    data: {
        type: String,
        required: [true, "name required"]
    },
   course: {
        type: String,
        required: [true, "course required"]
    },
    designation: {
        type: String,
        required: [true, "required"]
    },
    score: {
        type: Number,
       required: [true, "score required"]
    },
    score: {
        type: Number,
       required: [true, "score required"]
    },
    score: {
        type: Number,
       required: [true, "score required"]
    },
    score: {
        type: Number,
       required: [true, "score required"]
    },



})

const drillModel = mongoose.model('drill', drillSchema);


const app = express();
app.use(express.json());


app.get( "/", ( req, res ) => {
    res.status( 200 ).json( {
        message: "Welcome to my drill API."
    })
} )


app.post("/students", async (req, res) => {
    try {
        const student = await drillModel.create( req.body );
        if ( !student ) {
            res.status( 400 ).json( {
                message: "Error creating a student"
            })
        } else {
            res.status( 200 ).json( {
                status: "Success",
                data: student
            });
        }
    } catch ( error ) {
        res.status( 500 ).json( {
            message: error.message
        })
    }
} ) 



app.listen(PORT, ()=>{
    console.log(`Server is listening to port: ${PORT}`)
})