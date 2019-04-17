import { getUser } from './repositories/users.repository';
import { proceedWithRegistration, proceedWithQuestion, proceedWithProfile } from './modules';

import color from 'colors';

export default class Bot {
	
	constructor(user){
		this.userPhone = user;
	}

	async processMessage(input){
	
	try {
		
		var userData =  await getUser(this.userPhone.trim());
		
		console.log(color.yellow('\n\n','User data : '), color.red(userData.data));
		
		const state = userData.data.state;

		var response ;

		switch ( state ) {
			case 'notRegistered' : response = await proceedWithRegistration(state, this.userPhone.trim() );
			break;
			case 'registered' : response = await proceedWithProfile(state, this.userPhone.trim(), input);
			break;
			default : response = await proceedWithDefaultMessage(state, userData.data.phone);
		}

		return response;

	} catch(err) {
		console.log(err);
	}

		return
	
	}

}