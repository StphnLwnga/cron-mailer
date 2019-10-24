// Import the sendMail function from email.js
const { sendMail } = require('./email');

module.exports = {
	queryPendingStatus: () => {
		/*
			MySQL query for the database for orders and corresponding customers
			returning the values that 

			ACTUAL QUERY
				SELECT domaincart_user.email, domaincart_orders.NameServers as NS, domaincart_user.fname, domaincart_user.lname, domaincart_orders.ExpiryDate, domaincart_orders.OrderID
				FROM domaincart_user 
				INNER JOIN domaincart_orders 
				ON domaincart_orders.UserID=domaincart_user.UserID 
				WHERE domaincart_orders.ExpiryDate
				BETWEEN DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 10 DAY) 
				AND CURRENT_TIMESTAMP
		*/
		const query = `
			SELECT domaincart_user.email, domaincart_orders.NameServers as NS, domaincart_user.fname, domaincart_user.lname, domaincart_orders.ExpiryDate, domaincart_orders.OrderID
			FROM domaincart_user 
			INNER JOIN domaincart_orders 
			ON domaincart_orders.UserID=domaincart_user.UserID 
			WHERE domaincart_orders.OrderDate
			BETWEEN DATE_SUB(CURRENT_TIMESTAMP, INTERVAL 10 DAY) 
			AND CURRENT_TIMESTAMP
		`;
		db.query(
			query, 
			(err, res) => {
				if (err) throw err;
				db.end(err => {
  	      if (err) throw err;
	        console.log(`Connection to ${process.env.DB_DATABASE} terminated!`);
				});
				// console.log(res);
				sendMail(res);
			}
		);
	}
}