import { intro } from './lib/intro';
import { defaultMessage } from './lib/defaultMessage';




export const  Vocabulary = () => { return ( {

	
	intro: (user) => { return intro(user) } ,
	default: (user) => { return defaultMessage(user) }
		
	})
}

