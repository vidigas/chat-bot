import { Vocabulary } from '../../vocabulary/index';
import { updateUser } from '../../repositories/users.repository';
import * as VocabularyAlt from '../../vocabulary/vocabulary';
import {rWrapper} from '../../vocabulary/vocabulary';


export const proceedWithErrorContext =  async (richMessage) => {
    console.log('errorService');
    console.log(richMessage);
    try {
        //retorna o usuario pro idle
        richMessage.context.state = 'idle';
        const user = await updateUser(richMessage.context.phone, {state:richMessage.context.state});
        return rWrapper(VocabularyAlt.error(),'send',richMessage.context);	
    } catch(err) {
     console.log(err)
    }
}