// Create and process requests from the client
const express = require('express');

//
const cron = require('node-cron');

// File upload middleware 
const fs = require('fs');

const path = require('path');

// Parse incoming requests from the client
const bodyParser = require('body-parser');

// Node driver for MySQL
const mysql = require('mysql');

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

// Connect to database
db.connect(err => {
	if (err) throw err;
	console.log(`Connected to database - ${process.env.DB_DATABASE}`);
	cron.schedule(
		'* * */23 * * * ',
		() => {
			// Query database for soon to expire purchases and send emails to customer and accounts@ipayafrica.com
			queryPendingStatus();
		}
	)
}); 	
global.db = db;

// Middleware configuration
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));

// parse form data client
app.use(bodyParser.json()); 


app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});


