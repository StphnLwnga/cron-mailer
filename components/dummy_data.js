const moment = require('moment');

module.exports = {
	orders: [
		[3, 4,'NS1.example.com','KES','Active', moment("").format('YYYY-MM-DD HH:mm:ss')],
		[1,6,'NS2.example.com','KES','Active', moment("").format('YYYY-MM-DD HH:mm:ss')],
		[2,10,'NS3.example.com','KES','Pending', moment("").format('YYYY-MM-DD HH:mm:ss')],
		[3,12,'NS4.example.com','KES','Pending', moment("").format('YYYY-MM-DD HH:mm:ss')],
		[3,7,'NS5.example.com','KES','Expired', moment("").format('YYYY-MM-DD HH:mm:ss')],
		[1,2,'NS6.example.com','KES','Expired', moment("").format('YYYY-MM-DD HH:mm:ss')],
		[1,1,'NS7.example.com','KES','Active', moment("").format('YYYY-MM-DD HH:mm:ss')],
	],
	users: [
		['Omar','Little','omar@little.com','wtry31366347wafd','254XXXXXX','W.Baltimore','Baltimore','Maryland'],
		['Stringer','Bell','bell@stringer.com','wtry31366347wafd','254XXXXXX','W.Baltimore','Baltimore','Maryland'],
		['Avon', 'Barksdale','barksdale@avon.com','wtry31366347wafd','254XXXXXX','W.Baltimore','Baltimore','Maryland'],
	],
	populateOrders: db => {
		const sql_orders = "INSERT INTO domaincart_orders (UserID, productid, NameServers, currency, status, OrderDate) VALUES ?";
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