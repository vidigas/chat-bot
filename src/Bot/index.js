import { getUser } from './repositories/users.repository';
import * as Router from './router/index';
import { postMessage } from './repositories/messages.repository';
import { postResponse } from './repositories/messages.repository';

import color from 'colors';



export default class Bot {
	
	constructor(user){
		this.userPhone = user;
	}

	async processMessage(input){

// primera etapa do processo - Pega o usuário.
	try {
		
		//avalia se está registrado

		var userData =  await getUser(this.userPhone.trim());

		console.log(color.yellow('\n\n','User data : '), color.red(userData.data));
		const context = userData.data;
		const pMessage = {context : context, input:input}
		//posta a mensagem rica para a API. (depois tem que mexer isso para deixar no estilo handler)
		console.log(pMessage);
		const post = await postMessage(pMessage);
		//update a richmessage para conter o id da mensagem criada.
		const richMessage = {context : context, input : post.data};
		console.log(richMessage);
		// cria o objeto resposta
		var response;

		// input filter
		const filter = await Router.inputFilter(richMessage)
		console.log('filter',filter)
		if(filter.direction =='out'){
			response =  filter.out;
		} else{
			response = await Router.Context(richMessage);
		}
		console.log(response)
		const res_post = await postResponse(response);

		return response;

	} catch(err) {
		console.log(err);
	}

		return
	
	}

}