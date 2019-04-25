import {CreateUUID} from './ctlib';



export class Script {
    constructor(obj){
        this.name = obj? obj.text || 'noname' : 'noname';
        this.id = obj? obj.id || CreateUUID(): CreateUUID();
        this.content = obj? eval(obj.userData) || 'none' : 'none';
    }
}