 require ("./Config/hospitalconfig.js")
const express = require('express')
const PORT = 4404
const router = require("./Routes/hospitalroute.js")
const app = express();


app.use(express.json());
app.use("/api", router)

app.listen(PORT, ()=>{
    console.log(`listening on port ${PORT}`)

});