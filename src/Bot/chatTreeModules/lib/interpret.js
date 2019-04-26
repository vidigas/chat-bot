export class Interpret{
    constructor(){     
    }
    intDefault = (richMessage) =>{
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
    intMsg = (richMessage) =>{
        var msg = richMessage.input.text.toLowerCase();
        return msg;
    }
    int2 = (richMessage) =>{
        try{
        return richMessage.context.state.split('-')[1].toLowerCase();
    } catch{return 'default'}
    };
}