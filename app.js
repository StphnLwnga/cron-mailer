// Create handle routing and process requests from the client
const express = require('express');
// File upload middleware 
const fs = require('fs');
// Parse incoming requests from the client
const bodyParser = require('body-parser');
// Node driver for MySQL
const mysql = require('mysql');
// const path = require('path');
// Parse datetimes
const moment = require('moment');

//Dummy data
const dummy_data = require('./dummy_data.js');

const app = express();

// Access environmental variables from .env file
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


	const sql_users = "INSERT INTO domaincart_user (fname, lname, email, password, phone, address, city, country) VALUES ?";
	db.query(
		sql_users, 
		[dummy_data.users], 
		(err, res) => {
			if (err) throw err;
			console.log(`${process.env.DB_DATABASE} database, domaincart_user table populated!`);
			console.log(res);
			//Terminate connection
      db.end(err => {
	      if (err) throw err;
	      console.log(`Connection to ${process.env.DB_DATABASE} terminated!`);
      })
		}
	);
	// Adding dummy data -> DO ONCE ONLY
	/* 

	const sql_orders = "INSERT INTO domaincart_orders (UserID, productid, NameServers, currency, status, OrderDate) VALUES ?";
	db.query(
		sql_orders, 
		[dummy_data.orders], 
		(err, res) => {
			if (err) throw err;
			console.log(`${process.env.DB_DATABASE} database, domaincart_users table populated!`);
		}
	);
	

	/*TODO: 
		- Query orders table for Orderdate for order date about to expire i.e 10 days to expiry date
		- Get corresponding users by id 
		- elsaticemail to send email to customer and accounts@ipayafrica.com until order status changes from pending to active or expired
	*/
}); 	
global.db = db;

// console.log(dummy_data);

// console.log(process.env.DB_PORT, process.env.DB_HOST);

// Middleware configuration
app.set('port', port);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
// app.use(fileUpload()); // configure fileupload

app.listen(port, () => {
	console.log(`Server running on port: ${port}`);
});


