import { Vocabulary } from '../../vocabulary/index';
import { updateUser } from '../../repositories/users.repository';
import * as VocabularyAlt from '../../vocabulary/vocabulary';
import {rWrapper} from '../../vocabulary/vocabulary';


export const proceedWithEndService =  async (richMessage) => {
    console.log('endService');
    console.log(richMessage);
    try {

        richMessage.context.state = 'idle';
        const user = await updateUser(richMessage.context.phone, {state:richMessage.context.state});
        return rWrapper(VocabularyAlt.backToIdle(user),'send',richMessage.context);	
        
       

    } catch(err) {

        console.log(err)

    }
}