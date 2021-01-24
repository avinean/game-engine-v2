import path from 'path';
import express from "express";
const app = express();
const port = 8080; // default port to listen

app.use(express.static('client'));

// define a route handler for the default home page
app.get( "/", ( req, res ) => {
    res.send( "Hello world!" );
} );

// // define a route handler for the default home page
app.get( "/clicker", ( req, res ) => {
    res.sendFile(path.join(__dirname + '/../client/clicker/index.html'));
} )

// // define a route handler for the default home page
app.get( "/cursors", ( req, res ) => {
    res.sendFile(path.join(__dirname + '/../client/cursors/index.html'));
} );

// // define a route handler for the default home page
app.get( "/circles", ( req, res ) => {
    res.sendFile(path.join(__dirname + '/../client/circles/index.html'));
} );

// start the Express server
app.listen( port, () => {
    console.log( `server started at http://localhost:${ port }` );
} );