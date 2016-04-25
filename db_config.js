var db_string = 'mongodb://127.0.0.1/quiz';

var mongoose = require('mongoose').connect(db_string);

var db = mongoose.connection;

db.on('error',console.error.bind(console,'Erro ao conectar no banco'));

db.once('open',function(){
	var userSchema = mongoose.Schema({
		fullname: String,
		email: String,
		password: String,
		created_at: { type: Date, default: Date.now },
		updated: Date
	});
	
	exports.User = mongoose.model('User',userSchema);
	
	var itemQuestaoSchema = mongoose.Schema({
		alternativa: String,
		itemCorreto: Boolean
	});
	
	var questaoSchema = mongoose.Schema({
		enunciado: String,
		tipo: String,
		autor: { type: mongoose.Schema.ObjectId, ref: 'User' },
		categoria: String,
		itens:[itemQuestaoSchema],
		updated: Date,
		created_at: { type: Date, default: Date.now }
	});
	
	exports.Questao = mongoose.model('Question',questaoSchema);
});



	

