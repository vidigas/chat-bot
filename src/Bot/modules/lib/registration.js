import { Vocabulary } from '../../vocabulary/index';
import { updateUser } from '../../repositories/users.repository';

export const proceedWithRegistration =  async (state ,phone) => {
		try {

			//const user = await createUser(phone, 'student');	
			const user = await updateUser(phone, {state:'idle',role:'student'});

			// send welcome msg
			return Vocabulary(state , phone);	
	
		} catch(err) {
	
			console.log(err)
	
		}
}