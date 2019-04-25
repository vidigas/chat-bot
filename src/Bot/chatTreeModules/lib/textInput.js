import {CreateUUID} from './ctlib';


export class TextInput {
    constructor(obj){
        this.name = obj? obj.text || 'noname':'noname';
        this.id = obj ?obj.id || CreateUUID():CreateUUID();
        this.content =obj ? obj.text.split(",") || "nocontent":"nocontent";
    }
}