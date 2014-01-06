var express = require('express');
var app = express();
port = process.argv[2] || 8000;

app.configure(function (){
		app.use(
			"/",
			express.static("C:/projects/Lfvg/"));
});

app.listen(port);
console.log("express server running at http://localhost:" + port + 
	"/\nCTRL + C to shutdown");