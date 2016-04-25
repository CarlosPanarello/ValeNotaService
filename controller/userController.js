var db = require('../db_config.js');

exports.list = function(callback){
	db.User.find({},function(error,users){
		if(error){
			callback({error: 'Não foi possivel retornar os usuarios.'});
		}else{
			callback(users);
		}
	});
	
};

exports.user = function(id,callback){
	db.User.findById(id, function(error, user){
		
		if(error){
			callback({error: 'Não foi possivel retornar o usuario.'});
			return;
		} 
		
		if(!user){
			callback({error: 'Não existe o usuario com esse id.'});	
		} else{
			callback(user);
		}
		
	});
};

exports.save = function(fullname,email,password,callback){
	new db.User ({
		'fullname': fullname,
		'email': email,
		'password': password
		//'created_at': new Date()
	}).save(function(error,user){
		if(error){
			callback({error: 'Não foi possivel salvar o usuario'});
		}else{
			callback(user);
		}
	});
};

exports.update = function(id,fullname,email,password,callback){
	db.User.findById(id,function(error,user){
	
	if(fullname){
		user.fullname = fullname;
	}
	if(email){
		user.email = email;
	}
	if(password){
		user.password = password;
	}
	
	user.updated = new Date();
	
	user.save(function(error,user){
		if(error){
			callback({error: 'Não foi possivel atualizar o usuario'});
		}else{
			callback(user);
		}
	});
	
		
	});
};

exports.delete = function(id,callback){
	db.User.findById(id,function(error, user){
		if(error){
			callback({error: 'Não foi possivel excluir o usuario.'});
		} else if(user == null) {
			callback({error: 'Não existe o usuario com esse id.'});	
		} else {
			user.remove(function(error,user){
				if(!error){
					callback({response:'Usuário excluído com sucesso.'});
				}
			});
		}
	});
};