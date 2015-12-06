var app = require('express')();
var express = require('express');
var server = require('http').Server(app);
var request = require('request');
var serve  = require('serve-static');
var path   = require('path');


//open server
app.use(express.static(__dirname + '/frontend/app/js'));
app.use(express.static(__dirname + '/frontend/app/bower_components/angular'));
server.listen(3001);

console.log('Listening on port 3001...');

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// app.get('/make_payment/:payer_id/:merchant_id/:amount', function(req, res) {
//    var requestJson = {
//   		//format of json to be requested
// 	}
// 	//make payment
// 	request.post({
//   		headers: {'content-type' : 'application/json'},
//   		url:     'http://api.reimaginebanking.com/accounts/'+ req.params.payer_id +'/purchases?key=861704f6d70baf3cb968b49f6f4c9ef5',
//   		body:   JSON.stringify(requestJson)
// 		}, function(error, response, body){
//   			res.send(body);
// 		});
// });

// app.get('/make_transfer/:contributor/:payee/:amount', function(req, res){
// 	var requestJson = {
//   		"medium": "balance",
//   		"payee_id": req.params.payee,
//   		"amount": Number(req.params.amount),
//   		"transaction_date": getDateTime(),
//   		"status": "pending",
//   		"description": "string"
// 	}
// 	request.post({
// 		headers: {'content-type' : 'application/json'},
// 		url:     'http://api.reimaginebanking.com/accounts/'+ req.params.contributor +'/transfers?key=861704f6d70baf3cb968b49f6f4c9ef5',
// 		body:    JSON.stringify(requestJson)
// 	},function(error, response, body){
// 		res.send(body);
// 	});
// });


//res.json({"employees":[
//    	{"firstName":req.params.name, "lastName":"Doe"},
//   	{"firstName":"Anna", "lastName":"Smith"},
//    	{"firstName":"Peter", "lastName":"Jones"}
//	]});
