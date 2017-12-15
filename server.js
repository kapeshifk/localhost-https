#!/usr/bin/env node

//import library
var express = require('express');
var fs = require('fs');

//init server
var server = express();

//create logger and http server
var Logger = require('bunyan'),
    restify = require('restify'),
    log = new Logger.createLogger({
        name: 'Http Logs',
        serializers: {
            req: Logger.stdSerializers.req
        }
    }),
    server = restify.createServer({
        name: 'HTTP Server',
        version: '1.0.0',
        log: log
    });
	
//set SSL options
var https_options = {
  name: 'HTTPS Server',
  log: log,
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
  passphrase: 'password'
};

//create https server
var https_server = restify.createServer(https_options);

//set request log on both servers
server.pre(function (request, response, next) {
    request.log.info({ req: request }, 'REQUEST');
    next();
});

https_server.pre(function (request, response, next) {
    request.log.info({ req: request }, 'REQUEST');
    next();
});

//set up route endpoint
var setup_server = function(app) {
        function respond(req, res, next) {
            //res.send('Server App is listening!');
			var body = '<html><body>Server App is listening!</body></html>';
			res.writeHead(200, {
			  'Content-Length': Buffer.byteLength(body),
			  'Content-Type': 'text/html'
			});
			res.write(body);
			res.end();
			console.log('URL '+req.url);
			next();
        }

        //GET
        app.get('/', respond);
}
	
//register get on both servers
setup_server(server);
setup_server(https_server);

//start http server
server.listen(8080, function () {
    console.log('%s listening at %s', server.name, server.url);
});

//start https server
https_server.listen(443, function() {
    console.log('%s listening at %s', https_server.name, https_server.url);
});