
import { proceedWithRegistration, proceedWithQuestion, proceedWithProfile } from '../modules';



export default class Router{

    static async Context(context,input){
        switch (context) {
            case 'notRegistered' : return await proceedWithRegistration(state, this.userPhone.trim() );
            case 'profile' : return await proceedWithProfile(state, this.userPhone.trim(), input);
            case 'idle' : return await proceedWithStartService()
            case 'askingQ' : return await Router.AskingQ(context,input);
            default : return await proceedWithDefaultMessage(state, userData.data.phone);
    }
}

    static async AskingQ(context,input){
        switch (context) {
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

}
