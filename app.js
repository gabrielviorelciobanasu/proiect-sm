const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const app = express();
const port = 6789;

var fs = require('fs');
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
  fs.readFile('information.json', (err, data) => {
		if (err) console.log(err);
        var info = JSON.parse(data);
        res.render('index', {information: {status: info.status, temperature:info.actual_temperature}});   
  });
  console.log(req.body);
});

app.get('/information', (req, res) => {
  fs.readFile('information.json', (err, data) => {
		if (err) console.log(err);
        var info = JSON.parse(data);
        res.send(info);
	});
});


app.listen(port, () => console.log(`Server runs at the address: http://localhost:6789`));