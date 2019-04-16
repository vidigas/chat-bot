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

		switch ( state ) {
			case 'notRegistered' : return await proceedWithRegistration(state, this.userPhone.trim() );
			case 'registered' : return await proceedWithProfile(state, this.userPhone.trim(), input);
			default : return await proceedWithDefaultMessage(state, userData.data.phone);
		}

	} catch(err) {
		console.log(err);
	}

		return
	
	}

}