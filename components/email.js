const ee_Client = require("elasticemail-webapiclient").client;
const moment = require('moment');

module.exports = {
	sendMail: async arr => {
		try {
			const EMAIL = new ee_Client({
				apiKey: process.env.EE_API_KEY,
				apiUri: process.env.EE_URI,
				apiVersion: process.env.EE_VERSION,
			});
			arr.map(customer => {
				const info = new Object();
				[info.name, info.email, info.expiry, info.timeTo, info.nameservers] = [`${customer.fname} ${customer.lname}`, customer.email, customer.ExpiryDate, moment().to(moment(customer.ExpiryDate)), customer.NS.split(",")];
				// console.log(info);
				const emailParams = {
					"subject": "Slash Dot Labs Ltd. | Account Update",
					"to": "stphnlwnga99@gmail.com",
					"from": "steve.mutebi@slashdotlabs.com",
					"fromName": "Slash Dot Labs Ltd.",
					"bodyType": "Plain",
					"body": `Dear ${info.name}, your subscription for ${info.nameservers.join(', ')} is about to expire ${info.timeTo} on ${info.ExpiryDate}. Please sign into your dashboard to renew your hosting plan. Thank you for your continued support.`,
				}
				EMAIL
					.Email
					.Send(emailParams)
					.catch(e =>{ throw new Error(e)});
				console.log(`Email has been sent to ${emailParams.to}`);
			});
		} catch(err) {
			throw err;
		}
	}
}