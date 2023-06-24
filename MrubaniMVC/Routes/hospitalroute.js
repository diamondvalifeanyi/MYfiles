const express = require('express');
const router = express.Router();
const  newPatients = require("../Controller/hospitalcontroller");
const getAll = require("../Controller/hospitalcontroller")
const getOne = require("../Controller/hospitalcontroller")
const update = require("../Controller/hospitalcontroller")
const deletePatient = require("../Controller/hospitalcontroller")

router.get("/getall", getAll)
router.get("/getone/:id", getOne)
router.post("/patients", newPatients)
router.put("/updates/:id", update)
router.delete("/deletes/:id", deletePatient)






module.exports = router

