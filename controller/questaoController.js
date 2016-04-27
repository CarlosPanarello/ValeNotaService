var _und = require("../node_modules/underscore/underscore-min.js");

var db = require('../db_config.js');

function limpaPassword(resp){
	
	if(Array.isArray(resp)){
		_und.each(resp,function(questao){
			questao.autor.password = '';
		});
	} else {
		resp.autor.password = '';
	}
}

exports.list = function(callback){
	db.Questao.find()
	.populate('autor')
	.exec(function(error,questao){
		if(error){
			callback({error: 'Não foi possivel retornar as questões.'});
		}else{
			limpaPassword(questao);
			callback(questao);
		}
	});
};

exports.questaoById = function(id,callback){
	db.Questao.findById(id)
	.populate('autor')
	.exec(function(error, questao){
		
		if(error){
			callback({error: 'Não foi possivel retornar a questao.'});
			return;
		}
		
		if(!questao ){
			callback({error: 'Não existe questao com esse id.'});	
		} else{
			limpaPassword(questao);
			callback(questao);
		}
	});
};

exports.save = function(user,enunciado,tipo,categoria,itens,callback){
	var _questao = new db.Questao ({
		'enunciado': enunciado,
		'tipo': tipo,
		'autor': user,
		'categoria': categoria,
		'itens':itens
	});
	
	_questao.save(function(error,questao){
		if(error){
			callback({error: 'Não foi possivel salvar a questão.'});
		}else{
			callback(questao);
		}
	});
};