import { getUser } from './repositories/users.repository';
import * as Router from './router/index';
import { postMessage } from './repositories/messages.repository';
import { postResponse } from './repositories/messages.repository';
import { proceedWithError } from './modules';

import color from 'colors';



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

		console.log(richMessage);
		
		var response; 		// cria o objeto resposta

		const filter = await Router.inputFilter(richMessage)		// input filter

		console.log('filter',filter)

		if(filter.direction =='out'){

			response =  filter.out;
		} 
		else{

			response = await Router.Context(richMessage);
		}
		console.log(response)

		const res_post = await postResponse(response);

		return response;

	} catch(err) {

		console.log(err);
		
		response = proceedWithError(richMessage)

		console.log(response)

		const res_post = await postResponse(response);

	}

		return
	
	}

}