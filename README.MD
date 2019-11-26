Cron job that sends email reminders to customers whose purchases are within 10 days of expiry

# Node/Cron Job: Hosting and domain reminder.

### Setup Systemd service
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
; Run app as the unprivileged ubuntu user for safety
User=ubuntu
;Edit path to app accordingly
ExecStart=/usr/bin/node /PATH/TO/cron-jobs-node/app.js
Restart=on-failure

[Install]
WantedBy=multi-user.target
```
