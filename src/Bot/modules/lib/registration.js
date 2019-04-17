import { Vocabulary } from '../../vocabulary/index';
import { createUser } from '../../repositories/users.repository';

export const proceedWithRegistration =  async (state ,phone) => {
	if(state === 'registered') console.log('EAE PORRA')
	//filter for testing 	
		try {
	
			// save user on db
			const user = await createUser(phone, 'student');	
			
			// send welcome msg

			return Vocabulary(state , phone);	
	
		} catch(err) {
	
			console.log(err)
	
		}
}