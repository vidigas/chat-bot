import { getUser,postAction } from './repositories/users.repository';
import { postMessage } from './repositories/messages.repository';
import { postResponse } from './repositories/messages.repository';
import { readFileSync, readFile } from 'fs';
import { buildChatTree } from './buildChatTrees';
//teste
import color from 'colors';
import { RunTree, init } from './buildChatTrees';

var wait = ms => new Promise((r, j)=>setTimeout(r, ms))

export default class Bot {
	
	constructor(){
		this.trees = {}
	}

	async init() { 

	// const = ['push', 'profile'];
	try {
		this.trees['push'] =await JSON.parse(readFileSync(__dirname+'/ChatUI/treeRepo/push'));
		this.trees['profile'] = await JSON.parse(readFileSync(__dirname+'/ChatUI/treeRepo/profile'));
		await wait(200);
		this.trees.push = await buildChatTree(this.trees.push);
		this.trees.profile = await buildChatTree(this.trees.profile);

	}
	catch (error){
		console.log(error)
	}
	
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
		var response = await RunTree(this.trees.push  ,richMessage);


		const res_post = await postResponse(response);
		const res_action = await postAction(response);

		return response;

	} catch(err) {

		console.log(err.response || err);
		
	}
		return
	}
}

 
