
import  AccessControlMiddleware  from './middlewares/lib/AccessControlMiddleware';
var fs = require('fs');
var path = require('path');

import express from "express";
import bodyParser from "body-parser";

export default (bot) => {

const app = express();

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser({limit: '50mb'}));
app.use(AccessControlMiddleware.allowAccess); //middleware para por headers (CORS)

app.post('/message/:phone', async (req, res) => {
	const response = await bot.processMessage(req.params.phone,req.body.message);


		if(!response){
			
			
			var data = {	user: req.params.user , action: 'send',canal :'whatsapp' ,body: 'Desculpa, não escutei. Pode repetir. :)' }
		 
		  res.status(200).send(data)

		 return

		}

		//bot queue emitter vai entrar aqui, e vai direcionar as mensagens baseadas no canal e usuario.
		
		res.status(200).send(response)

	})


	// PORTA DO CHAT UI
	//depois colocar isso na estrutura use router handler
	app.use('/chatUI',express.static(__dirname+'/chatUI'));
	// OU. criar um mongodb para salvar esses dados json. Como é um arquivo que agente pode querer mexer manual, acho que vale a pena ser um arquivo.
	var textParser = bodyParser.text({ type: 'text/plain',limit: "50mb", extended: true, parameterLimit:50000 });
	app.post('/chatTree/:name', textParser,(req,res) =>{
		fs.writeFile(__dirname+'/chatUI/treeRepo/'+req.params.name,req.body,function(err) {
			if(err) {res.send('could not save file because ' + err)}
			console.log("The file was saved!");}); 
			res.send(req.params.name + ' file was saved');
	});
	app.get('/chatTree/:name', (req,res) =>{
		fs.readFile(__dirname+'/chatUI/treeRepo/'+req.params.name, function (err, data) {
			if (err) {res.send('file not found')};
			res.send(data);
		  });	
	});
	app.get('/chatTree/', (req,res) =>{
		var data = [];
		fs.readdirSync(__dirname+'/chatUI/treeRepo/').forEach(file => {
		data.push(file);
		  });
		res.send(data);
	});	

	app.use('/',(req,res)=>{
		res.sendFile(path.resolve(__dirname+'/testchat.html'))
	})

 	return app

}

	// TERMINA PARTE DO UI





