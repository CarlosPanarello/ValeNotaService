var express = require('express');

var app = module.exports = express();

var bodyParser = require('body-parser');

var allowCors = function(req,res,next){
	res.header('Access-Control-Allow-Origin', '127.0.0.1:8080');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    //res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    //res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    res.header('Access-Control-Allow-Credentials', 'true');
 
	next();
}

app.use(allowCors);

app.listen(8080);

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
