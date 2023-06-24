const express = require('express');
const mongoose = require('mongoose');
const port = 3434

const app = express();
app.use(express.json());

const electionSchema = mongoose.Schema({
state: {type: String, required:[true,"state is required"], unique:[true,"state aleady used"]},
parties: {type: Array, required:[true,"parties are required"]},
result: {type: Object, required:[true,"parties are required"]},
//collationOfficer: String,
totalResult: {type: Number, default: 0},
totalRegisteredVotes: {type: Number, required:[true,"total voters are required"]},
isRigged: {type: Boolean, default: ()=>{
    if (this.totalResult>this.totalRegisteredVotes){return true}
    else {return false}
    return isRigged
    return totalResult
}},
// winner: {type: String, default: function(){
//     let maxValue = 0
//     let maxKey = null;
//     for(const [key, value] of Object.entries(this.result)){
//         if(value>maxValue){
//             maxValue = value
//             maxKey = key
//         }
//     }
//     return maxKey
//}},
//totalVotes: Number,
}, {timeStamp: true})

const electionModel = mongoose.model("Presidential Election", electionSchema)

app.get("/", (req, res) => {
    res.send("welcome to our election api homepage")
})



app.post("/creates", async(req, res) => {
    try{
        const createdData = await electionModel.create(req.body)
        res.status(200).json({
            message: "success",
            data: createdData
        })

    }catch(error) {
        res.status(400).json({
            message: error
        })
    }
})

    
    
    
    



//    const createdData = await electionModel.create(data)

   
// get winner
app.get("/winner/:id", async(req, res)=> {
    try {
        const getElectionDetails = await electionModel.findById(req.params.id)

        electionResult = getElectionDetails.result

        let highestValue = -Infinity
        let winningParty = null

        for(const parties in electionResult){
            const value = electionResult[parties]
            
            if(value > highestValue){
                highestValue = value
                winningParty =parties
            }
        }
        res.status(200).json({message: `The winner of the elelction is ${winningParty} with ${highestValue}`})
    } catch (error) {
        res.status(404).json({
            message: error.message
        })
    }
})


// create
app.post("/elections", async(req, res) => {
    try {
        const newEntry =await electionModel.create(req.body)
        if (newEntry){
            res.status(201).json({
                message: "success",
                data: newEntry,
                size: electionModel.length
            })
        }else {
            res.status(400).json({
                message: "cannot create this data"
        })
    }
        
    } catch (error) {
        res.status(400).json({
            message: "cannot create this data"
        })
    }
})

// get by rigged
app.get("/rigged", async(req, res) => {
    try {
        const rigged = await electionModel.find({isRigged: true});
        res.status(200).json({
                    message: "success",
                    data: rigged
                })
    } catch (error) {console.log(error.message)
        
    }
})



// read all party
app.get("/elections", async(req, res) =>{
    const party = await electionModel.find()
    if (!party) {
        res.status(404).json("party not found")
    }else {
        res.status(200).json({
            message: "success",
            data: party
        })
    }
} )

// double collation officer
app.get("/doubleofficer", async(req, res) => {
    try {
        const doubleCollationOfficer = await electionModel.find({collationOfficer: req.body.collationOfficer});
        res.status(200).json({
            message: "success",
            data: doubleCollationOfficer
        })
        
    } catch (error) {
        console.log(error.message)
        
    }
})

// double collation officer 2 wit name
app.get("/check/:collationOfficer", async (req, res) => {
    try {
        const doubleCollationOfficer = await electionModel.find(req.params.collationOfficer)
        res.status(200).json({
            message: "success",
            data: doubleCollationOfficer,
            size: electionModel.length
        });
        
    } catch (error) {
        console.log(error.message)
        
    }
})

// delete rigged
app.delete("/delete", async(req, res) => {
    try {
        const deletedEntry = await electionModel.findAndDelete({isRigged: true})
        if (deletedEntry) {
            res.status(200).json({
                message: "Deleted successfully",
                data: deletedEntry,
                size: electionModel.length
            })
        }else {
            res.status(400).json({
                message: "cannot delete this data"
            })
        }
        
    } catch (error) {
        res.status(400).json({
                    message: "cannot delete this data"
                })
        
    }
})

app.post("/winners", async (req, res) => {
    try {
        const newEntry = await electionModel.create(req.body);
        const winner = newEntry.result.total;
        const totalAll = newEntry.totalVotes
        if ( totalAll !== winner){
            res.status(201).json({
                message: "good",
                data: (newEntry)

            })
        }else{
            res.status(400).json({
                            message: "cannot determine winner"
                        })
        }
    } catch (error) {
        res.status(400).json({
                    message: "cannot update data"
                })
        
    }
})





app.listen(port, () =>{
    console.log("working on port " + port);
})
mongoose.connect("mongodb+srv://diamondvalifeanyi001:lGeP0b24Z5WnYWDD@cluster0.ctr5lvp.mongodb.net/").then(
    ()=>{console.log("connection established")}
).catch((error) =>{
    console.log(error.message)
})