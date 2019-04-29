import { getUser,postAction } from './repositories/users.repository';
import { postMessage } from './repositories/messages.repository';
import { postResponse } from './repositories/messages.repository';
//teste
import color from 'colors';
// import { RunTree, init } from './buildChatTrees';
import TreeComposer from './treeComposer';
import {Logger} from './helper/'
import {flattenArray} from './chatTreeModules/lib/ctlib';


export default class Bot {
	
constructor() {

	this.buildedTrees = {};
}

	async init() { 
		
		var composeTree = new TreeComposer(['push','profile','testeteste','respostaProf']);
		await composeTree.init().then()
		this.trees = composeTree.trees;
}

	async RunTree ( chatTree, richMessage){
		var response = await chatTree.Run(richMessage); //his returns an array of one or more items
			for(var i=0;i<response.length;i++){
			if(!response[i].newTree) {} //ta tosco isso mas nao quero mexer agora
			// roda o grupo de respostas, se não for newtree, devolve o grupo, se alguma delas for newtree, aprofunda
			// e substitui a propria resposta newtree com a resposta que vier de lá
			else{response[i] = await this.RunTree(this.trees[response[i].newTree],richMessage);}}
			response = flattenArray(response); //desfaz os nested arrays para garantir uma lista de respostas
			return response;
	}

	async processMessage(userPhone,input){
// primera etapa do processo - Pega o usuário.
	try {

		
		var userData =  await getUser(userPhone.trim()); 		//avalia se está registrado

		console.log(color.yellow('\n\n','User data : '), color.red(userData.data));
		
		const context = userData.data;

		const pMessage = {context : context, input:input}

		const post = await postMessage(pMessage);	//posta a mensagem rica para a API. (depois tem que mexer isso para deixar no estilo handler)

		//TODO: criar Rmessage numa classe ou func.
		var richMessage = {context : context, input : post.data};		//update a richmessage para conter o id da mensagem criada.
		var responses = await this.RunTree(this.trees.push  ,richMessage);
		// gambiarra - se responses nao é array, transforma em array de 1
		for(var i=0;i<responses.length;i++){
		const res_post = await postResponse(responses[i]);
		const res_action = await postAction(responses[i]);
		}
		return responses[0]; //retornando só uma resposta.

	} catch(err) {

		console.log(err.response || err);
		
	}
		return
	}
}

 
