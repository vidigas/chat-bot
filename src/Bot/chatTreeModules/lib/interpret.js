import {decideBestMatch,searchNegation} from './nlp'
import {isEmail} from './rgxCheck'
import { Logger } from '../../helper';


//estou pensando que isso aqui deve virar duas coisas:
//PRIMEIRO: capacidade de inputar e guardar interpretadores em JSON e em mongodb, eventualmente.
// funcionar como o chat UI
//SEGUNDO: para isso, tem que fazer um construtor padrão de interperters;
// esse construtor poderia levar o codigo ou poderia levar uma logica de construcao
// essa logica poderia inclusive ser stackear interpretadores existentes.
// essa logica poderia ser do tipo: quem interpreter, o que interpretar. possibilidade de interpertar 2 e ver qual dá melhor match (text e context, por exemplo?)
// nesse caso, teria uns tipos: de filter, de transformacao, de posicao, de validacao, etc...

export class Interpret{
    constructor(){     
    }
    //executa na ordem. Todas tem que entrar richmessage
    StackMult(...args){
        var stackedFunction = (intMsg)=>{
            intMsg = arguments[0](intMsg)
                for (var i = 1; i < arguments.length; i++) {
                    intMsg = arguments[i](intMsg)
                }
            return intMsg
        }
        return stackedFunction
    }
    buildInterpreter(){
        //fazer uma funcao que constroi e instala um interpreter.
    }

    defaultInterpreter = (richMessage) =>{
        try{
            return richMessage.context.state.split('-')[0].toLowerCase();
        } catch{
            return 'default';
        }
        };
    intFilter = (richMessage) =>{
        var msg = richMessage.input.text.toLowerCase();
        var state = richMessage.context.state.toLowerCase();
        if(msg=='preciso de ajuda' || msg=='menu inicial'){
            return 'filter';
        } else {return state;}
    }
    intMsgLower = (richMessage) =>{
        var msg = richMessage.input.text.toLowerCase();
        return msg;
    }
    intMsg = (richMessage,caseArray)=>{
        var sentence = richMessage.input.text;
        var cas = decideBestMatch(sentence,caseArray,false,0.9);
        var neg = searchNegation(sentence);
        if(neg==true){cas = 'default'}
        return cas;
    }
    int2 = (richMessage) =>{
        try{
        return richMessage.context.state.split('-')[1].toLowerCase();
    } catch{return 'default'}
    };

    valEmail = (richMessage) =>{
        try{    var output = isEmail(richMessage.input.text)?'valid':'invalid'
    }catch(err){console.log(err)}
    return output;
    }
}