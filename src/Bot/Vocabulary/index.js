import { intro } from './lib/intro';
import { defaultMessage } from './lib/defaultMessage';




export const  Vocabulary = (method, user) => { 

	switch (method) {
		case 'intro': return intro(user);
		case 'registration':
		default : return defaultMessage(user);
	}

}

