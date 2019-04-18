import { Vocabulary } from '../../vocabulary/index';
import { updateUser } from '../../repositories/users.repository';
import * as VocabularyAlt from '../../vocabulary/vocabulary';
import {rWrapper} from '../../vocabulary/vocabulary';


export const proceedWithHelpService =  async (richMessage) => {
    console.log('helpService');
    console.log(richMessage);
    try {

        const user = await updateUser(richMessage.context.phone, {state:richMessage.context.state});
        return rWrapper(VocabularyAlt.help(user),'send',richMessage.context);	
        
       

    } catch(err) {

        console.log(err)

    }
}