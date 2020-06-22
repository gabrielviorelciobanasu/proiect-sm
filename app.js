const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser')
const app = express();
const port = 6789;
var fs = require('fs');
var mysql = require('mysql');


app.set('view engine', 'ejs');
app.use(expressLayouts);
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var ready = "yes";

app.get('/', (req, res) => {
  fs.readFile('information.json', (err, data) => {
		if (err) console.log(err);
        var info = JSON.parse(data);
	console.log("/")
	console.log(info.status,info.actual_temperature,info.target,info.isBurning)   
        res.render('index', {information: {status: info.status, temperature:info.actual_temperature, target: info.target, isBurning: info.isBurning}});
	
  });
});

app.get('/information', (req, res) => {
  fs.readFile('information.json', (err, data) => {
		if (err) console.log(err);
        var info = JSON.parse(data);
        res.send(info);
	});
});

var count = 15;
var timer;


function Decrement()
{
  if(count > 0)
  {
    ready="no";
    count--;
  }
  else
  {
    count=15;
    clearInterval(timer);
    ready="yes";
  }
  if(count%3==0)
  {
   
  }
  console.log(count);
}


app.post('/', (req, res) => {
  console.log(req.body.action);
  console.log(req.body.desired_temperature);

  var command;
  var target=req.body.desired_temperature;
  
  var con = mysql.createConnection({
    host: "localhost",
    user: "pi",
    password: "",
    database: "sm"
  });
  if(count == 15 && ready == "yes")
  {
    timer = setInterval(Decrement, 1000);
  }
  if(req.body.action=="Start" && ready == "yes")
  {
    command = "on";
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO commands (tip_comanda, target) VALUES (\"" + command +"\", " + target+")";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
  }
  else if(req.body.action=="Stop" && ready == "yes")
  {
    command = "off";
    con.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
      var sql = "INSERT INTO commands (tip_comanda, target) VALUES (\"" + command +"\", " + 0 +")";
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
      });
    });
  } 
  else
  {
    console.log('Not ready yet.');
  }

  fs.readFile('information.json', (err, data) => {
		if (err) console.log(err);
        var info = JSON.parse(data);
	console.log("fs")
	console.log(info.status,info.actual_temperature,info.target,info.isBurning)   
        res.render('index', {information: {status: info.status, temperature:info.actual_temperature, isReady: ready, target: info.target, isBurning: info.isBurning}});   
  });
});


app.listen(port, () => console.log(`Server runs at the address: http://localhost:6789`));
