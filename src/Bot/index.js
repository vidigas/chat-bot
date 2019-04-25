import { getUser,postAction } from './repositories/users.repository';
import { postMessage } from './repositories/messages.repository';
import { postResponse } from './repositories/messages.repository';
import { ChatTree, Interpret } from './chatTreeModules/'
import color from 'colors';
import { Vocab } from './chatTreeModules/lib/vocab';
import { readFileSync, readFile } from 'fs';

export default class Bot {
	
	constructor(user){
		this.userPhone = user;
	}
	async processMessage(input){

// primera etapa do processo - Pega o usuário.
	try {

		
		var userData =  await getUser(this.userPhone.trim()); 		//avalia se está registrado

		console.log(color.yellow('\n\n','User data : '), color.red(userData.data));
		
		const context = userData.data;

		const pMessage = {context : context, input:input}

		console.log(pMessage);	

		const post = await postMessage(pMessage);	//posta a mensagem rica para a API. (depois tem que mexer isso para deixar no estilo handler)

		var richMessage = {context : context, input : post.data};		//update a richmessage para conter o id da mensagem criada.
		var response = await RunTree(trees.push,richMessage);

		return response;

	} catch(err) {

		console.log(err.response || err);
		
	}
		return
	}
}
var buildChatTree = async (json) => {
	console.log('ler arquivo');
	var chatTree = new ChatTree();
	var interpret = new Interpret();
	var vocab = new Vocab(); //estou chamando direto na construção da chat tree, e ponho opcao de aumentar
	chatTree.parseJson(json);
	chatTree.AddObject('defaultInterpreter',interpret.intDefault);
	chatTree.AddObject('intFilter',interpret.intFilter);
	chatTree.AddObject('int2',interpret.int2);
	chatTree.AddObject('intMsg',interpret.intMsg);
	chatTree.AddVocabulary('questionRegistered', ()=>{return 'Pergunta Registrada!'});
	chatTree.AddVocabulary('startMenu', ()=>{return 'Você pode fazer uma PERGUNTA, FALAR conosco ou consultar seu SALDO'});
	chatTree.Build();
	return chatTree;
}
var RunTree = async (chatTree,richMessage) => {
	way = await chatTree.Run(richMessage);
	var response = way.last();
	if(!response.newTree){
		console.log(response);
		const res_post = await postResponse(response);
		const res_action = await postAction(response);
		return response;

	} else {
		console.log('response newtree',response.newTree);
		var way = await RunTree(trees[response.newTree],richMessage);
		response=way.last();
	}
}

var log = console.log;
console.log = function() {
	console.log.tracer = true;
    log.apply(console, arguments);
	// Print the stack trace
	if(!console.log.tracer){
	console.trace();
}
};
var trees = {};
var wait = ms => new Promise((r, j)=>setTimeout(r, ms))
const init = async () =>{
	trees['push'] =await JSON.parse(readFileSync(__dirname+'/ChatUI/treeRepo/push'));
	trees['profile'] = await JSON.parse(readFileSync(__dirname+'/ChatUI/treeRepo/profile'));
	console.log('a')
	await wait(200);
	trees.push = await buildChatTree(trees.push);
	trees.profile = await buildChatTree(trees.profile);

	}
init().then(()=>{
	console.log(trees.push.Check());
});
 
