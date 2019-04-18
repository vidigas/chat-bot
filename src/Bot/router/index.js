
import * as Module from '../modules';



export const Context = async (richMessage) => {
    //provisorio, o ideal é passar context e input direto até o interpretador
    console.log('routerContext')
    switch (richMessage.context.state) {
        case 'notRegistered' : return await Module.proceedWithRegistration(richMessage.context.state,richMessage.context.phone);
        case 'registered':
        case 'idle' : return await Module.proceedWithBeginService(richMessage);
        case 'profile' : return await Module.proceedWithProfile(richMessage);
        case 'asking' : return await askingQ(richMessage);
        default : return await Module.proceedWithDefaultMessage(richMessage);
    }
}

export const askingQ = async (richMessage) => {
    //provisorio
    return await Module.proceedWithBeginService(richMessage)
    switch (richMessage.context.state) {
        //waiting for a question
        case 'waitQuestion' : return await proceedWithQuestion(state, this.userPhone.trim(), input);
        //waiting for question confirmation
        case 'confirmQuestion' : return await routerAskingQ(context,input);
        //asked if wanted to send more info : awaiting answer;
        case 'isThatAll' : return await routerAskingQ(context,input);
        //confirm more info
        case 'waitMoreInfo' : return await routerAskingQ(context,input);
        //asked if wanted to send more info : awaiting answer;
        default : return await proceedWithDefaultMessage(state, userData.data.phone);
    }
}

export const inputFilter = async (richMessage) => {

    const interpret = richMessage.input.text;
    console.log(interpret);
    switch (interpret){
        case 'MENU PRINCIPAL':
            return {'direction':'out', 'out': await Module.proceedWithEndService(richMessage) };
        case'PRECISO DE AJUDA' :
            return {'direction':'out', 'out': await Module.proceedWithHelpService(richMessage) };
        default:
            return {'direction':'followup'}
    }

}