var express = require('express');

var url = require('url');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get("/info", function (req, res) {
	console.log(req.ip);
	console.log(req.headers);
	var result = {};
	result.ipaddress = req.headers['x-forwaded-for'] || req.connection.remoteAddress;
	result.language = req.headers['accept-language'].split(",")[0];
	var r = /\(([^\(\)]+)\)/.exec(req.headers['user-agent'])[1];
	result.software = r;
	res.json(result);
	res.end();
});

app.listen(process.env.PORT || 3000);