import { getUser } from './repositories/users.repository';
import { proceedWithRegistration, proceedWithQuestion, proceedWithProfile } from './modules';

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
		
		const state = userData.data.state;

		var response ;

		
		// Verificar se é uma questão de ordem?


		// Roteador Contexto (vale a pena )
		const router = new Router(context,input);
		Bot.Router(context,input)

		return response;

	} catch(err) {
		console.log(err);
	}

		return
	
	}

}