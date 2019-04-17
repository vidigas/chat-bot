import { intro } from './lib/intro';
import { profile } from './lib/profile';
import { defaultMessage } from './lib/defaultMessage';




export const  Vocabulary = (method, user) => { 
	switch (method) {
		case 'notRegistered': return intro(user);
		case 'registered': return profile('registered', user);
		default : return defaultMessage(user);
	}

}

