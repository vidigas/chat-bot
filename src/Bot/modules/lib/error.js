import { Vocabulary } from '../../vocabulary/index';
import { updateUser } from '../../repositories/users.repository';
import * as VocabularyAlt from '../../vocabulary/vocabulary';
import {rWrapper} from '../../vocabulary/vocabulary';


export const proceedWithError =  async (richMessage) => {
    console.log('errorService');
    console.log(richMessage);
    try {
        return rWrapper(VocabularyAlt.error(),'send',richMessage.context);	
    } catch(err) {
     console.log(err)
    }
}