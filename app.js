"use strict";

var app = require('./app_config.js');

var userController = require('./controller/userController.js')

var questaoController = require('./controller/questaoController.js')

var validator = require('validator');

app.get('/',function(req,res){
	res.end('Servidor On');
	console.log('Entrou');
});

app.post('/users',function(req,res){
	console.log('incluindo users via post.');
	
	var fullname = validator.trim(validator.escape(req.body.fullname));
	var email = validator.trim(validator.escape(req.body.email));
	var password = validator.trim(validator.escape(req.body.password));
	
	userController.save(fullname, email, password, function(resp){
		res.json(resp);
	});
});

app.delete('/users/:id',function(req,res){
	console.log('deleta users via delete .' + req.params.id);
	
	var id = validator.trim(validator.escape(req.params.id));
		
	userController.delete(id,function (resp){
		res.json(resp);
	});
});

app.put('/users/:id',function(req,res){
	console.log('update users via update .' + req.params.id);
	
	var id = validator.trim(validator.escape(req.params.id));
	var fullname = validator.trim(validator.escape(req.body.fullname));
	var email = validator.trim(validator.escape(req.body.email));
	var password = validator.trim(validator.escape(req.body.password));
	
	userController.update(id,fullname, email, password, function(resp){
		res.json(resp);
	});
});

app.get('/users/:id',function(req,res){
	console.log('get users by id ' + req.params.id);

	var id = validator.trim(validator.escape(req.params.id));
	
	userController.user(id,function (resp){
		res.json(resp);
	});
});

app.get('/users',function(req,res){
	console.log('get users');
	
	userController.list(function (resp){
		res.json(resp);
	});
});

app.get('/questao',function(req,res){
	console.log('get questoes');
	
	questaoController.list(function (resp){
		res.json(resp);
	});
});

app.get('/questao/:id',function(req,res){
	console.log('get questoes by id ' + req.params.id);
	
	var id = validator.trim(validator.escape(req.params.id));
	
	questaoController.questaoById(id,function (resp){
		res.json(resp);
	});
});

app.post('/questao',function(req,res){
	console.log('incluindo questao via post.');
	
	var enunciado = validator.trim(validator.escape(req.body.enunciado));
	var	tipo = validator.trim(validator.escape(req.body.tipo));
	var user = { '_id': '571d6e27a5aa1f140eb2e392'};
	var categoria = validator.trim(validator.escape(req.body.categoria));
	var itens = [
		{'alternativa':'Uml presta?',itemCorreto:true},
		{'alternativa':'Uml é uma bosta?',itemCorreto:false}];
	
	questaoController.save(user,enunciado,tipo,categoria,itens, function(resp){
		res.json(resp);
	});
});
