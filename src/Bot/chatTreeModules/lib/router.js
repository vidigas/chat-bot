import {CreateUUID,routerBuilder} from './ctlib';


export class Router{
    constructor(obj){
        this.name = obj.name || 'noname';
        this.id = obj.id || CreateUUID();
        this.default = obj.default || 'moduleDefaultOutput';
        this.err = obj.err || 'moduleErrOutput';
        this.interpreter = obj.interpreter || 'defaultInterpreter';
        this.run = 'not built'
        this.caseArray = obj.caseArray || [];
        this.outputArray = obj.outputArray || [];
        
        this.jsonref = obj || 'none';

    }
    addCase(caso,output){
        //check if case alredy exists here
        this.caseArray.push(caso);
        this.outputArray.push(output)
    }
    Build(objectlist){
        console.log('Building', this.name);
        try{
            this.interpreter = objectlist[this.interpreter].name //pega o nome 
        }catch{
            this.interpreter = 'defaultInterpreter';
        }
        if(this.interpreter=='undefined'){this.interpreter = 'defaultInterpreter';}
        this.interpreter = objectlist[this.interpreter]; 
        this.run = routerBuilder(this.interpreter,this.caseArray,this.outputArray,this.default,this.err)
    }
}