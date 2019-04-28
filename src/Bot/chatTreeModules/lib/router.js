import {CreateUUID,routerBuilder} from './ctlib';
import {Logger} from '../../helper/'



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
        this.caseArray.push(caso);
        this.outputArray.push(output)
    }
    Build(objectlist){
        try{

            this.interpreter = objectlist[this.interpreter].name //pega o nome 
        }catch{

            Logger('--warning : interpreter' + this.interpreter+ ' not found; going default')

            this.interpreter = 'defaultInterpreter';
        }

        if(this.interpreter=='undefined'){this.interpreter = 'defaultInterpreter';}
        
        this.interpreterFunction = this.parent.interpreterLib[this.interpreter]; 
        
        this.run = routerBuilder(this.interpreterFunction,this.caseArray,this.outputArray,this.default,this.err)
        
        if(typeof this.run =='function') console.log(this.name,' Router Built');
    }
}