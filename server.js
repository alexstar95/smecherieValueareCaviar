var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var http = require('http');
var request = require('request');
var serve  = require('serve-static');
var path   = require('path');

//var zerorpc = require('zerorpc');

app.use(express.static(__dirname + '/frontend/app/js'));
app.use(express.static(__dirname + '/frontend/app/bower_components/angular'));
server.listen(3001);

console.log('Listening on port 3001...');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/getCarsResult', function(req, res) {

	http.get({
		host: 'elastic-motdata-1240169001.eu-west-1.elb.amazonaws.com',
		path: '/motdata/testresult/_search?pretty&size=5000&q=test_id:37846611'
	}, function(response) {
		
			var body = '';
			response.on('data', function(d) {
				body += d;
			});
			response.on('end', function() {
			
				res.send(body);
			});
	});

});

app.get('/getCars', function(req, res) {

	http.get({
		host: 'elastic-motdata-1240169001.eu-west-1.elb.amazonaws.com',
		path: '/motdata/testitem/_search?pretty&size=1000&from=1'
	}, function(response) {
		
			var body = '';
			response.on('data', function(d) {
				body += d;
			});
			response.on('end', function() {
			
				res.send(body);
			});
	});

});

app.get('/carDetails', function(req, res) {
	
	var msg = req.message;

	var client = new zerorpc.Client();
	client.connect('tcp://127.0.0.1:4242');

	client.invoke("hello", "RPC", function(error, res, more) {
		console.log(res);
		return res;
	});

});
