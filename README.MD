Cron job that sends email reminders to customers whose purchases are within 10 days of expiry

# Node/Cron Job: Hosting and domain reminder.

### In a terminal 
- ```npm install```

### In the ```.env``` file in the root directory, add/edit the following parameters:
```
DB_CONLIMIT=
DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
PORT=5000
EE_API_KEY=
EE_URI=
EE_VERSION=
```
EE_* -> Elastic Email credentials/parameters. 

### To test 
- ```npm start```

### Setup ```systemd``` service
 - Open up a terminal and enter the following:
```
	sudo gedit /lib/systemd/system/domain-reminder.service
```

 - This will open the file in ubuntu's default text editor. Enter the follwing:
```
[Unit]
Description=node-cron.js - send reminders to renew hosting plan
Documentation=https://slashdotlabs.com/
; Ensures app only runs after networking functionality of the server is online
After=network.target

; Environmental variables specified here, edit accordingly
[Service]
Environment=NODE_PORT=5000
Type=simple
; Run app as the unprivileged user for safety, edit accordingly
User=EnterUserHere
;Edit path to app accordingly
ExecStart=/usr/bin/node /PATH/TO/cron-jobs-node/app.js
Restart=always
RestartSec=500ms
StartLimitInterval=0

[Install]
WantedBy=multi-user.target
```

 - Save the script and make it executable:
```
	sudo chmod +x  /lib/systemd/system/domain-reminder.service
```

 - Using ```systemctl``` to launch and control the app:
```
	sudo systemctl daemon-reload
	
	sudo systemctl start domain-reminder
```

 - To view the state that ```systemd``` thinks the app is in:
```
	sudo systemctl status domain-reminder
```

 - To stop the app:
```
	sudo systemctl stop domain-reminder
```

 - To restart the app:
```
	sudo systemctl restart domain-reminder
```
