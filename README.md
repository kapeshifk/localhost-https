##Self-signed SSL server for NodeJS

Just a simple app to get an http and https server up

##Installation

npm install

##GENERATE SELF SIGNED CERTS: 
	```
		
	-----------------------------------------------------------
	Heroku article: https://devcenter.heroku.com/articles/ssl-certificate-self)
	------------------------------------------------------------
	
	(Copy paste the below commands one by one)
	
	Step 1. openssl genrsa -des3 -passout pass:x -out server.pass.key 2048 
	Step 2. openssl rsa -passin pass:x -in server.pass.key -out server.key 
	Step 3. rm server.pass.key 
	Step 4. openssl req -new -key server.key -out server.csr                   (<----- Hit Enter to accept default values or enter your own)
	Step 5. openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
	
	
	**Alternative**: openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days XXX

	```


##RUN:

Console:

node server.js 


Browser:

https://localhost:443

http://localhost:8080
