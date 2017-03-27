var express = require('express');
var app = express();

var morgan = require('morgan');

app.use(morgan('short'));

app.get('/', (req, res) => {
	res.send("App running");
});

app.listen(8080, function(){
	console.log('Server running on port 8080')
});