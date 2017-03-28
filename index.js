var express = require('express');
var app = express();

var morgan = require('morgan');

app.use(morgan('short'));

app.get('/', (req, res) => {
	res.send("App running");
});

app.get('/:date', (req, res) => {
	var dateObj;
	var monthNames = [
			'Janruary',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December'
		];
	if (typeof(+req.params.date) === 'number' &&  !isNaN(+req.params.date)) {
		var date = new Date((+req.params.date + 18000000) * 1000);
		
		console.log(+req.params.date);
		var natural_date = `${monthNames[+date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
		console.log(date.getMonth());
		dateObj = {
			unix: +req.params.date,
			natural: natural_date
		};

		res.send(JSON.stringify(dateObj));
	} else if (typeof (req.params.date) == 'string') {
		
		var date2 = new Date(req.params.date);
		
		var unixTStamp = (Date.parse(date2) - 18000000) / 1000;
		var natural_date2 = `${monthNames[+date2.getMonth()]} ${date2.getDate()}, ${date2.getFullYear()}`;
		dateObj = {
			unix: unixTStamp,
			natural: natural_date2
		};
		if (date2 == 'Invalid Date') {
			dateObj = {
				unix: null,
				natural: null
			};
			
		}
		
		res.send(JSON.stringify(dateObj));
		
	}
});

app.use((req, res) => {
	res.status(404).send("Page not Found. Try another page");
});

app.listen(8080, function() {
	console.log('Server running on port 8080')
});