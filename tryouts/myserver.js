// first import the express library
const express = require('express');
const fs = require('fs')
PORT = 9090;

 const tryout = express();
 //app.use(express.json());

tryout.get("/", (req, res) => {
    res.status(200).json({
        message: "trying out a simple api"
    })
});

// getting the database
 const readDatabase = (req, res) => {
    const myDatabase = fs.readFileSync("./myuser.json");
    return JSON.parse(myDatabase);
 }

 //writing to the database
 const writeMyDatabase = (data) => {
    fs.writeFileSync("./myuser.json", JSON.stringify(data));
 }

 // getting all users from the database
 tryout.get("/users", (req, res) => {
    const myusers = readDatabase();
    if (myusers.myusers.length === 0){
        res.status(404).json({
            message: "no users found",
        })
    }else {
        res.status(200).json({
            message: "users found, working fine",
            data: myusers,
            total: myusers.myusers.length
        });
    }
 })























tryout.listen(PORT, () => {
    console.log("listening to the port i created " + PORT)
});