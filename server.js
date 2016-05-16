var express = require('express');

var url = require('url');

var app = express();

app.use(express.static(__dirname + '/public'));

app.get("/info", function (req, res) {
	console.log(req.ip);
	console.log(req.headers);
	var result = {};
	var ipAddr = req.headers["x-forwarded-for"];
		if (ipAddr){
			var list = ipAddr.split(",");
			ipAddr = list[list.length-1];
		} else {
			ipAddr = req.connection.remoteAddress;
		}
	result.ipaddress = ipAddr;
	result.language = req.headers['accept-language'].split(",")[0];
	var r = /\(([^\(\)]+)\)/.exec(req.headers['user-agent'])[1];
	result.software = r;
	res.json(result);
	res.end();
});

app.listen(process.env.PORT || 3000);