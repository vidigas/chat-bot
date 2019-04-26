import { getUser,postAction } from './repositories/users.repository';
import { postMessage } from './repositories/messages.repository';
import { postResponse } from './repositories/messages.repository';
import { readFileSync, readFile } from 'fs';
//teste
import color from 'colors';
// import { RunTree, init } from './buildChatTrees';
import TreeComposer from '../TreeComposer';


export default class Bot {
	
constructor() {

	this.trees = {};
}

	async init() { 
		
		var composeTree = new TreeComposer();
		
		await composeTree.init().then()


		this.trees['push'] =  composeTree.getTree('push');
		this.trees['profile'] =  composeTree.getTree('profile');
}

	async RunTree ( chatTree, richMessage){
	
		var way = await chatTree.Run(richMessage);
		var response = way[way.length - 1];
		if(!response.newTree) return response;


		 way = await this.RunTree(this.trees[response.newTree],richMessage);
		
		return way;

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
		var response = await this.RunTree(this.trees.push  ,richMessage);


		const res_post = await postResponse(response);
		const res_action = await postAction(response);

		return response;

	} catch(err) {

		console.log(err.response || err);
		
	}
		return
	}
}

 
