// Create and process requests from the client
const express = require('express');

// File upload middleware 
const fs = require('fs');

const path = require('path');

// Parse incoming requests from the client
const bodyParser = require('body-parser');

// Node driver for MySQL
const mysql = require('mysql');

//Dummy data
// const dummy_data = require('./components/dummy_data.js');

const { queryPendingStatus } = require('./components/sql.js');

const app = express();

// environmental variables from .env file
const dotenv = require('dotenv');
dotenv.config();

const port = process.env.PORT;

// Create connection to the database
const db = mysql.createConnection({
	connectionLimit : process.env.DB_CONLIMIT,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_DATABASE,
});

global.queryResults;
// Connect to database
db.connect(err => {
	if (err) throw err;
	console.log(`Connected to database - ${process.env.DB_DATABASE}`);
	queryPendingStatus();
}); 	
global.db = db;

// console.log(dummy_data);

// Middleware configuration
app.set('port', port);

// set express to look in this folder to render our view
// app.set('views', __dirname + '/views'); 

// configure template engine
// app.set('view engine', 'ejs'); 
app.use(bodyParser.urlencoded({ extended: false }));

// parse form data client
app.use(bodyParser.json()); 

// configure express to use public folder
// app.use(express.static(path.join(__dirname, 'public'))); 
// app.use(fileUpload()); // configure fileupload

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});


