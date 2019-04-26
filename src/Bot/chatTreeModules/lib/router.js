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
        // console.log(this.name);
        // console.log('interpreter:',this.interpreter);
        try{
            // console.log('try',this.interpreter);
            this.interpreter = objectlist[this.interpreter].name //pega o nome 
        }catch{
            // console.log('catchou',this.interpreter);
            this.interpreter = 'defaultInterpreter';
        }
        // console.log('out',this.interpreter);
        if(this.interpreter=='undefined'){this.interpreter = 'defaultInterpreter';}
        // console.log('posdefault',this.interpreter);
        this.interpreter = objectlist[this.interpreter]; 
        // console.log('interpreterfuncao',this.interpreter);
        // console.log(this.condArray,this.outputArray)
        this.run = routerBuilder(this.interpreter,this.caseArray,this.outputArray,this.default,this.err)
    }
}