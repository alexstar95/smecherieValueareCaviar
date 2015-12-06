var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var request = require('request');
var serve  = require('serve-static');
var path   = require('path');
var bodyParser = require('body-parser');
var http = require('http');

app.use(express.static(__dirname + '/frontend/app/js'));
app.use(express.static(__dirname + '/frontend/app/bower_components/angular'));
app.use(express.static(__dirname + '/frontend/app/css'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

server.listen(3001);

console.log('Listening on port 3001...');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});


app.post('/sendData', function(req, res) {
	
	var cilinder = req.body.carCapacity;
	var mileage  = req.body.carMileage;
	var carF     = req.body.carFirst;
	var carT     = req.body.carTest;

	var options = {
  		host: 'http://192.168.72.115',
  		port: '5000',
  		path: '/getprobability/' + cilinder
			+ '/' + mileage + '/' + carF + '/' + carT
	};
	
	http.get(options, function(resp) {
		var body = '';
		resp.on("data", function(chunk) {
			body += chunk;
		});
	});

	res.send(body);
});
