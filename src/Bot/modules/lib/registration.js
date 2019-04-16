import { Vocabulary } from '../../vocabulary/index';
import { createUser } from '../../repositories/users.repository';

export const proceedWithRegistration =  async (phone) => {
	
	//filter for testing 	
		try {
	
			// save user on db
			const user = await createUser(phone, 'student');	
			
			// send welcome msg

			return( Vocabulary().intro('intro', phone));	
	
		} catch(err) {
	
			console.log(err)
	
		}
}