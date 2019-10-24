const moment = require('moment');

module.exports = {
	orders: [
		[3, 4,'NS1.example.com','KES','Active'],
		[1,6,'NS2.example.com','KES','Active'],
		[2,10,'NS3.example.com','KES','Pending'],
		[3,12,'NS4.example.com','KES','Pending'],
		[3,7,'NS5.example.com','KES','Expired'],
		[1,2,'NS6.example.com','KES','Expired'],
		[1,1,'NS7.example.com','KES','Active'],
	],
	users: [
		['Omar','Little','omar@little.com','wtry31366347wafd','254XXXXXX','W.Baltimore','Baltimore','Maryland'],
		['Stringer','Bell','bell@stringer.com','wtry31366347wafd','254XXXXXX','W.Baltimore','Baltimore','Maryland'],
		['Avon', 'Barksdale','barksdale@avon.com','wtry31366347wafd','254XXXXXX','W.Baltimore','Baltimore','Maryland'],
	],
	populateOrders: db => {
		const sql_orders = "INSERT INTO domaincart_orders (UserID, productid, NameServers, currency, status) VALUES ?";
	  db.query(
		  sql_orders, 
		  [this.orders], 
		  (err, res) => {
			  if (err) throw err;
				console.log(`${process.env.DB_DATABASE} database, domaincart_users table populated!`);
				console.log(res);
			  //Terminate connection
        db.end(err => {
  	      if (err) throw err;
	        console.log(`Connection to ${process.env.DB_DATABASE} terminated!`);
        })
		  }
	  );
	},
	populateUsers: db => {
		const sql_users = "INSERT INTO domaincart_user (fname, lname, email, password, phone, address, city, country) VALUES ?";
	  db.query(
		  sql_users, 
		  [this.users], 
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
	},
}