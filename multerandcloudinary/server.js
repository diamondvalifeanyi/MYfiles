require('./config/personDB')
const express = require('express');
const PORT = 1010;
const personRouter = require('./routes/personRouter')


const app = express();
app.use(express.json());
app.use('/uploads', express.static('uploads'));


app.use('/api', personRouter)
app.listen(PORT, ()=>{
    console.log('listening on port' + PORT)
})