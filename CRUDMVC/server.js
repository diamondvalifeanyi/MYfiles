require('./Config/config')
const express = require('express');
const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// dotenv.config({path: "./Config/config.env"})

const app = require("./app");
const PORT = process.env.PORT || 5555
// const DB = process.env.DATABASE
 
app.listen(PORT, ()=>{
    console.log(`listening on port : ${PORT}`);
})

