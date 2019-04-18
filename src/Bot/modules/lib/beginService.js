import { Vocabulary } from '../../vocabulary/index';
import { updateUser } from '../../repositories/users.repository';
import * as VocabularyAlt from '../../vocabulary/vocabulary';
import {rWrapper} from '../../vocabulary/vocabulary';


export const proceedWithBeginService =  async (richMessage) => {
    console.log('beginService');
    console.log(richMessage);
    try {
        //const interpret = interpret(richMessage);
        const interpret = richMessage.input.text;
        console.log(interpret);
        switch (interpret){
            case 'NOVA PERGUNTA':
            //define contexto da resposta
            richMessage.context.state = 'asking';
            //atualiza contexto do usuario database
            const user = await updateUser(richMessage.context.phone, {state:'asking'});
            return rWrapper(VocabularyAlt.askQuestion(user),'send',richMessage.context);	
            case 'Tudo bem?':
            return rWrapper(VocabularyAlt.tudoBem(),'send',richMessage.context);
            case 'Quem é voce?':
            return rWrapper(VocabularyAlt.aboutUs(),'send',richMessage.context);
            default:
            return rWrapper(VocabularyAlt.interact(),'send',richMessage.context);

        }
       

    } catch(err) {

        console.log(err)

    }
}