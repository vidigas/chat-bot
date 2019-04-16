import { getUser } from './repositories/users.repository';
import { proceedWithRegistration, proceedWithQuestion } from './modules';

export default class Bot {
	
	constructor(user){
		this.user = user;
	}

	async processMessage(input){
	
	try {
		
		var user =  await getUser(this.user);

		if(user.data.notRegistered)  return await proceedWithRegistration(this.user.trim());

		//TODO: PROCEED WITH QUESTION  -> READ THE MSG AND PARSE TO SE IF ITS A QUESTION THEN SEND TO TEACHERS GROUP
		return await proceedWithQuestion(this.user.trim());

	} catch(err) {
		console.log('err');
	}

		return
	
	}

}