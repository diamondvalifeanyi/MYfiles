const express = require('express');
const {newCollection, viewAll, updateInfo, getOne, deletedItem} = require("../Controller/bag")

const Router = express.Router()
Router.route("/new").post(newCollection)
Router.route("/view").get(viewAll)
Router.route("/update/:id").put(updateInfo)
Router.route("/getone/:id").get(getOne)
Router.route("/delete/:id").delete(deletedItem)

module.exports = Router;