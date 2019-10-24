const ee_Client = require("elasticemail-webapiclient").client;
const moment = require('moment');

module.exports = {
	sendMail: arr => {
		try {
			const EMAIL = new ee_Client({
				apiKey: process.env.EE_API_KEY,
				apiUri: process.env.EE_URI,
				apiVersion: process.env.EE_VERSION,
			});
			arr.map(async customer => {
				const info = new Object();
				[info.name, info.email, info.expiry, info.timeTo, info.nameservers] = [`${customer.fname} ${customer.lname}`, customer.email, customer.ExpiryDate, moment().to(moment(customer.ExpiryDate)), customer.NS.split(",")];
				// console.log(info);
				const emailParams = {
					"subject": "Account Update | Slash Dot Labs Ltd.",
					"to": info.email,
					"from": "accounts@slashdotlabs.com",
					"fromName": "Slash Dot Labs Ltd.",
					"bodyType": "Plain",
					"body": `Dear ${info.name}, your subscription for ${info.nameservers.join(', ')} is about to expire ${info.timeTo} on ${info.ExpiryDate}. Please log into your dashboard to renew or upgrade your plan. 
					Thank you for your continued support.`,
				}
				await EMAIL
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