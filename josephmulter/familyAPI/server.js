require( './config/config' );
const express = require( 'express' );
const studentRouter = require('./routes/route')
const PORT = 9090;


const app = express();
app.use( express.json() );
app.use( "/uploads", express.static( "uploads" ) );

app.use('/api', studentRouter)

app.listen( PORT, () => {
    console.log(`listening to port: ${ PORT }`);
});