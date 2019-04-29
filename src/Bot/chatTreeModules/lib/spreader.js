import {CreateUUID,spreaderBuilder} from './ctlib';
import {Logger} from '../../helper/'



export class Spreader{
    constructor(obj){
        this.name = obj.name || 'noname';
        this.id = obj.id || CreateUUID();
        this.run = 'not built'
        this.outputArray = obj.outputArray || [];
        this.jsonref = obj || 'none';

    }
    addOutput(output){
        this.outputArray.push(output)
    }
    Build(){
        this.run = spreaderBuilder(this.outputArray)
        if(typeof this.run =='function') console.log(this.name,' Spreader Built');
    }
    Create({name,id,outputArray}){
        this.name = name || 'noname';
        this.id = id || CreateUUID();
        this.run = 'not built'
        this.outputArray = outputArray || [];
        this.jsonref = this.jsonref || 'none';
    }
}