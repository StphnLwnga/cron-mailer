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
}